// inputNode.js

import { BaseNode } from './BaseNode';

export const inputConfig = {
  type: 'customInput',
  label: 'Input',
  icon: '📥',
  accent: 'input',
  width: 220,
  height: 128,
  description: 'Entry point of your pipeline.',
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customInput-', 'input_'),
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File'],
      default: 'Text',
    },
  ],
  handles: [{ type: 'source', position: 'right', id: 'value', label: 'value' }],
};

export const InputNode = (props) => <BaseNode {...props} config={inputConfig} />;
