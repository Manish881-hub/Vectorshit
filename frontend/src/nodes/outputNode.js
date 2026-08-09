// outputNode.js

import { BaseNode } from './BaseNode';
import { IconOutput } from '../components/icons';

export const outputConfig = {
  type: 'customOutput',
  label: 'Output',
  icon: IconOutput,
  accent: 'output',
  width: 220,
  height: 128,
  description: 'Result of your pipeline.',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image'],
      default: 'Text',
    },
  ],
  handles: [{ type: 'target', position: 'left', id: 'value', label: 'value' }],
};

export const OutputNode = (props) => <BaseNode {...props} config={outputConfig} />;
