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
import {
  IconCode,
  IconImage,
  IconInput,
  IconLLM,
  IconMemory,
  IconOutput,
  IconText,
  IconTool,
  IconTransformer,
} from '../components/icons';

export const nodeRegistry = [
  { type: 'customInput', component: InputNode, label: 'Input', icon: IconInput, description: 'Source of data' },
  { type: 'llm', component: LLMNode, label: 'LLM', icon: IconLLM, description: 'Language model' },
  { type: 'customOutput', component: OutputNode, label: 'Output', icon: IconOutput, description: 'Pipeline result' },
  { type: 'text', component: TextNode, label: 'Text', icon: IconText, description: 'Text with {{variables}}' },
  { type: 'transformer', component: TransformerNode, label: 'Transformer', icon: IconTransformer, description: 'Advanced LLM step' },
  { type: 'memory', component: MemoryNode, label: 'Memory', icon: IconMemory, description: 'Persistent state' },
  { type: 'code', component: CodeNode, label: 'Code', icon: IconCode, description: 'Custom logic' },
  { type: 'tool', component: ToolNode, label: 'Tool', icon: IconTool, description: 'External API call' },
  { type: 'image', component: ImageNode, label: 'Image', icon: IconImage, description: 'Text-to-image' },
];

export const nodeTypes = Object.fromEntries(
  nodeRegistry.map(({ type, component }) => [type, component])
);
