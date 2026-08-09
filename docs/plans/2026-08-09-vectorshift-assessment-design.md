# VectorShift Frontend Assessment — Design

Date: 2026-08-09
Status: Validated with user (3 brainstorming questions)

## Decisions

1. **Styling**: VectorShift-inspired dark theme. Dark navy canvas, per-node accent colors (input=yellow, llm=blue, output=purple, etc.), modern card-based nodes, themed ReactFlow chrome (minimap, controls, edges).
2. **New nodes (Part 1 demo)**: Transformer, Memory, Code, Tool, Image — chosen to exercise every capability of the abstraction (multi-fields, multi-handles, selects, textareas, dynamic handles).
3. **Abstraction**: Config-driven `BaseNode`. A single generic component renders header/body/fields/handles from a declarative config object. New nodes are thin config definitions (~20 lines). Supports `dynamicSize`, `getDynamicHandles`, and a custom `render` hook for power users (used by the Text node).

## Architecture

- `src/nodes/BaseNode.js` — generic renderer; owns field state, syncs to zustand store via `updateNodeField`, auto-spaces handles per side, renders handle labels, applies config `dynamicSize`.
- `src/nodes/*Node.js` — each exports `{type}Config` (declarative spec) and `{type}Node` wrapper. Text node uses `render` + `getDynamicHandles` + `dynamicSize` for variables and auto-resizing.
- `src/nodes/index.js` — `nodeRegistry` (type, label, icon, description, component) + derived `nodeTypes` map for ReactFlow. Single source of truth consumed by `ui.js` and `toolbar.js`.
- `src/store.js` — fix `updateNodeField` to be immutable.
- `src/submit.js` — POST `{nodes, edges}` JSON as `pipeline` form field to `/pipelines/parse`; alert with num_nodes / num_edges / is_dag.
- `backend/main.py` — CORS for localhost:3000; `POST /pipelines/parse` parses JSON, counts nodes/edges, detects cycles via Kahn's algorithm (topological sort).

## Data flow

Palette drag → `onDrop` (ui.js) → `addNode` (store) → ReactFlow renders `nodeTypes[type]` → BaseNode reads config → field changes write back to store → Submit → FormData POST → backend returns `{num_nodes, num_edges, is_dag}` → alert.

## Key behavior: Text node

- Regex `/\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g` extracts unique variables from text.
- Each variable → a target Handle on the left edge (evenly spaced) via `getDynamicHandles`.
- Node width/height recalculated from line count + longest line + variable count via `dynamicSize` (pure function).
- Variable badges strip rendered via custom `render` hook.

## Verification

- `npm run build` passes.
- Backend import/compile passes; endpoint logic unit-tested inline (cycle vs DAG cases).
