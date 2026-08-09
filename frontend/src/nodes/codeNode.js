// codeNode.js

import { BaseNode } from './BaseNode';

export const codeConfig = {
  type: 'code',
  label: 'Code',
  icon: '⌨️',
  accent: 'code',
  width: 240,
  height: 180,
  description: 'Run a custom transformation on the input.',
  fields: [
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: ['Python', 'JavaScript', 'SQL'],
      default: 'Python',
    },
    {
      name: 'code',
      label: 'Code',
      type: 'textarea',
      rows: 4,
      placeholder: 'def run(state):\n    return state.upper()',
    },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'input', label: 'input' },
    { type: 'source', position: 'right', id: 'output', label: 'output' },
  ],
};

export const CodeNode = (props) => <BaseNode {...props} config={codeConfig} />;
