// imageNode.js

import { BaseNode } from './BaseNode';
import { IconImage } from '../components/icons';

export const imageConfig = {
  type: 'image',
  label: 'Image',
  icon: IconImage,
  accent: 'image',
  width: 240,
  height: 170,
  description: 'Generate an image from a text prompt.',
  fields: [
    {
      name: 'prompt',
      label: 'Prompt',
      type: 'textarea',
      rows: 2,
      placeholder: 'A sunset over the ocean',
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: ['512x512', '1024x1024'],
      default: '1024x1024',
    },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'prompt', label: 'prompt' },
    { type: 'source', position: 'right', id: 'image', label: 'image' },
  ],
};

export const ImageNode = (props) => <BaseNode {...props} config={imageConfig} />;
