// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
          }
          return node;
        }),
      });
    },
    removeEdgesConnectedTo: (nodeIds) => {
      set({
        edges: get().edges.filter(
          (edge) => !nodeIds.has(edge.source) && !nodeIds.has(edge.target)
        ),
      });
    },
    pruneEdges: (nodeId, validHandleIds) => {
      set({
        edges: get().edges.filter((edge) => {
          const sourceOk =
            !edge.sourceHandle ||
            !edge.sourceHandle.startsWith(`${nodeId}-`) ||
            validHandleIds.includes(edge.sourceHandle.slice(nodeId.length + 1));
          const targetOk =
            !edge.targetHandle ||
            !edge.targetHandle.startsWith(`${nodeId}-`) ||
            validHandleIds.includes(edge.targetHandle.slice(nodeId.length + 1));
          return sourceOk && targetOk;
        }),
      });
    },
  }));
