// llmNode.js

import { BaseNode } from './BaseNode';
import { IconLLM } from '../components/icons';

export const llmConfig = {
  type: 'llm',
  label: 'LLM',
  icon: IconLLM,
  accent: 'llm',
  width: 220,
  height: 112,
  description: 'Large language model. Connect a system prompt and a user prompt.',
  handles: [
    { type: 'target', position: 'left', id: 'system', label: 'system' },
    { type: 'target', position: 'left', id: 'prompt', label: 'prompt' },
    { type: 'source', position: 'right', id: 'response', label: 'response' },
  ],
};

export const LLMNode = (props) => <BaseNode {...props} config={llmConfig} />;
