// toolNode.js

import { BaseNode } from './BaseNode';

export const toolConfig = {
  type: 'tool',
  label: 'Tool',
  icon: '🔧',
  accent: 'tool',
  width: 240,
  height: 160,
  description: 'Call an external API with the pipeline data.',
  fields: [
    {
      name: 'toolName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('tool-', 'tool_'),
    },
    { name: 'endpoint', label: 'Endpoint', type: 'text', placeholder: 'https://api.example.com' },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'input', label: 'input' },
    { type: 'target', position: 'left', id: 'args', label: 'args' },
    { type: 'source', position: 'right', id: 'output', label: 'output' },
  ],
};

export const ToolNode = (props) => <BaseNode {...props} config={toolConfig} />;
