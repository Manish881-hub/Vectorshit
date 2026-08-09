// nodes/index.js
// ---------------------------------------------------------------------
// Single source of truth for every node type. ui.js derives the
// ReactFlow nodeTypes map and toolbar.js derives the drag palette
// from this registry, so adding a node is one registry entry.
// ---------------------------------------------------------------------

import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { TransformerNode } from './transformerNode';
import { MemoryNode } from './memoryNode';
import { CodeNode } from './codeNode';
import { ToolNode } from './toolNode';
import { ImageNode } from './imageNode';

export const nodeRegistry = [
  { type: 'customInput', component: InputNode, label: 'Input', icon: '📥', description: 'Source of data' },
  { type: 'llm', component: LLMNode, label: 'LLM', icon: '🧠', description: 'Language model' },
  { type: 'customOutput', component: OutputNode, label: 'Output', icon: '📤', description: 'Pipeline result' },
  { type: 'text', component: TextNode, label: 'Text', icon: '📝', description: 'Text with {{variables}}' },
  { type: 'transformer', component: TransformerNode, label: 'Transformer', icon: '⚡', description: 'Advanced LLM step' },
  { type: 'memory', component: MemoryNode, label: 'Memory', icon: '🗂️', description: 'Persistent state' },
  { type: 'code', component: CodeNode, label: 'Code', icon: '⌨️', description: 'Custom logic' },
  { type: 'tool', component: ToolNode, label: 'Tool', icon: '🔧', description: 'External API call' },
  { type: 'image', component: ImageNode, label: 'Image', icon: '🖼️', description: 'Text-to-image' },
];

export const nodeTypes = Object.fromEntries(
  nodeRegistry.map(({ type, component }) => [type, component])
);
