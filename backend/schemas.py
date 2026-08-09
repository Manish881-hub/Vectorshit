from typing import List

from pydantic import BaseModel, Field


class NodeRef(BaseModel):
    id: str = Field(min_length=1)


class EdgeRef(BaseModel):
    source: str = Field(min_length=1)
    target: str = Field(min_length=1)


class PipelineData(BaseModel):
    nodes: List[NodeRef] = Field(default_factory=list)
    edges: List[EdgeRef] = Field(default_factory=list)
