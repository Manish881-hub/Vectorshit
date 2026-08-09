import json

import pytest

from services.pipeline_service import PipelineParseError, analyze_pipeline


def make_payload(nodes, edges):
    return json.dumps({"nodes": nodes, "edges": edges})


class TestAnalyzePipeline:
    def test_dag(self):
        result = analyze_pipeline(make_payload(
            nodes=[{"id": "a"}, {"id": "b"}, {"id": "c"}],
            edges=[{"source": "a", "target": "b"}, {"source": "b", "target": "c"}],
        ))
        assert result == {"num_nodes": 3, "num_edges": 2, "is_dag": True}

    def test_cycle(self):
        result = analyze_pipeline(make_payload(
            nodes=[{"id": "a"}, {"id": "b"}],
            edges=[{"source": "a", "target": "b"}, {"source": "b", "target": "a"}],
        ))
        assert result == {"num_nodes": 2, "num_edges": 2, "is_dag": False}

    def test_self_loop_is_not_a_dag(self):
        result = analyze_pipeline(make_payload(
            nodes=[{"id": "a"}],
            edges=[{"source": "a", "target": "a"}],
        ))
        assert result["is_dag"] is False

    def test_edge_to_unknown_node_is_ignored_for_topology(self):
        result = analyze_pipeline(make_payload(
            nodes=[{"id": "a"}],
            edges=[{"source": "a", "target": "zz"}],
        ))
        assert result == {"num_nodes": 1, "num_edges": 1, "is_dag": True}

    def test_empty_pipeline(self):
        assert analyze_pipeline("{}") == {"num_nodes": 0, "num_edges": 0, "is_dag": True}

    def test_missing_nodes_and_edges_keys(self):
        assert analyze_pipeline(json.dumps({"nodes": []})) == {"num_nodes": 0, "num_edges": 0, "is_dag": True}

    def test_invalid_json_raises_parse_error(self):
        with pytest.raises(PipelineParseError, match="not valid JSON"):
            analyze_pipeline("not-json")

    def test_node_without_id_is_rejected(self):
        with pytest.raises(PipelineParseError, match="invalid shape"):
            analyze_pipeline(make_payload(nodes=[{}], edges=[]))

    def test_edge_without_source_is_rejected(self):
        with pytest.raises(PipelineParseError, match="invalid shape"):
            analyze_pipeline(make_payload(nodes=[{"id": "a"}], edges=[{"target": "a"}]))

    def test_nodes_not_a_list_is_rejected(self):
        with pytest.raises(PipelineParseError, match="invalid shape"):
            analyze_pipeline(json.dumps({"nodes": {"id": "a"}, "edges": []}))

    def test_non_object_payload_is_rejected(self):
        with pytest.raises(PipelineParseError, match="must be a JSON object"):
            analyze_pipeline(json.dumps(["a", "b"]))
        with pytest.raises(PipelineParseError, match="must be a JSON object"):
            analyze_pipeline(json.dumps("plain-string"))
