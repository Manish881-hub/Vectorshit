"""Business logic for pipeline analysis. Kept free of HTTP concerns so
the FastAPI controller stays a thin request/response layer."""

import json
from typing import Dict, List

from pydantic import ValidationError

from schemas import EdgeRef, NodeRef, PipelineData


class PipelineParseError(ValueError):
    """Raised when the raw pipeline payload cannot be interpreted."""


def _is_dag(nodes: List[NodeRef], edges: List[EdgeRef]) -> bool:
    """Kahn's algorithm: a graph is a DAG iff every node can be topologically sorted.

    Edges referencing unknown nodes are ignored for the topology check.
    """
    node_ids = {node.id for node in nodes}
    adjacency = {node_id: [] for node_id in node_ids}
    in_degree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if edge.source in adjacency and edge.target in adjacency:
            adjacency[edge.source].append(edge.target)
            in_degree[edge.target] += 1

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


def analyze_pipeline(raw_pipeline: str) -> Dict[str, object]:
    try:
        payload = json.loads(raw_pipeline)
    except (json.JSONDecodeError, TypeError) as exc:
        raise PipelineParseError("Pipeline payload is not valid JSON") from exc

    if not isinstance(payload, dict):
        raise PipelineParseError("Pipeline payload must be a JSON object")

    try:
        data = PipelineData.model_validate(payload)
    except ValidationError as exc:
        raise PipelineParseError("Pipeline payload has an invalid shape") from exc

    return {
        "num_nodes": len(data.nodes),
        "num_edges": len(data.edges),
        "is_dag": _is_dag(data.nodes, data.edges),
    }
