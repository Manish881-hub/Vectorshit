import json

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_dag(nodes, edges):
    """Kahn's algorithm: a graph is a DAG iff every node can be topologically sorted."""
    node_ids = {node['id'] for node in nodes}
    adjacency = {node_id: [] for node_id in node_ids}
    in_degree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source, target = edge.get('source'), edge.get('target')
        if source in adjacency and target in adjacency:
            adjacency[source].append(target)
            in_degree[target] += 1

    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited = 0

    while queue:
        current = queue.pop()
        visited += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    data = json.loads(pipeline)
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])

    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag(nodes, edges),
    }
