// transformerNode.js

import { BaseNode } from './BaseNode';
import { IconTransformer } from '../components/icons';

export const transformerConfig = {
  type: 'transformer',
  label: 'Transformer',
  icon: IconTransformer,
  accent: 'transformer',
  width: 240,
  height: 200,
  description: 'Advanced LLM step with model, temperature and prompt.',
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      options: ['GPT-4o', 'Claude 3.7', 'Llama 3.3', 'Gemini 2.0'],
      default: 'GPT-4o',
    },
    { name: 'temperature', label: 'Temperature', type: 'text', placeholder: '0.7' },
    { name: 'prompt', label: 'Prompt', type: 'textarea', rows: 2, placeholder: 'Summarize the input…' },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'input', label: 'input' },
    { type: 'target', position: 'left', id: 'context', label: 'context' },
    { type: 'source', position: 'right', id: 'response', label: 'response' },
  ],
};

export const TransformerNode = (props) => <BaseNode {...props} config={transformerConfig} />;
