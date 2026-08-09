import json
import sys
import urllib.error
import urllib.parse
import urllib.request

base = "http://localhost:8000/pipelines/parse"

cases = [
    ("dag", {"nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}], "edges": [{"source": "a", "target": "b"}, {"source": "b", "target": "c"}]}, 200, {"num_nodes": 3, "num_edges": 2, "is_dag": True}),
    ("cycle", {"nodes": [{"id": "a"}, {"id": "b"}], "edges": [{"source": "a", "target": "b"}, {"source": "b", "target": "a"}]}, 200, {"num_nodes": 2, "num_edges": 2, "is_dag": False}),
    ("self_loop", {"nodes": [{"id": "a"}], "edges": [{"source": "a", "target": "a"}]}, 200, {"num_nodes": 1, "num_edges": 1, "is_dag": False}),
    ("edge_to_unknown", {"nodes": [{"id": "a"}], "edges": [{"source": "a", "target": "zz"}]}, 200, {"num_nodes": 1, "num_edges": 1, "is_dag": True}),
    ("empty", {}, 200, {"num_nodes": 0, "num_edges": 0, "is_dag": True}),
    ("not_json", "not-json", 422, None),
    ("json_array_payload", ["a", "b"], 422, None),
    ("edge_without_src", {"nodes": [{"id": "a"}], "edges": [{"target": "a"}]}, 422, None),
    ("node_without_id", {"nodes": [{}], "edges": []}, 422, None),
]

failures = 0
for name, payload, expected_status, expected_body in cases:
    body = urllib.parse.urlencode({"pipeline": payload if isinstance(payload, str) else json.dumps(payload)}).encode()
    req = urllib.request.Request(base, data=body, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            status, actual = resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        status, actual = e.code, json.loads(e.read().decode() or "{}")

    ok = status == expected_status and (expected_body is None or actual == expected_body)
    print(f"{'PASS' if ok else 'FAIL'} {name:20s} -> {status} {actual}")
    if not ok:
        failures += 1

if failures:
    print(f"\n{len(failures)} FAILURES")
    sys.exit(1)
print("\nAll smoke tests passed.")
