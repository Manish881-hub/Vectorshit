// memoryNode.js

import { BaseNode } from './BaseNode';
import { IconMemory } from '../components/icons';

export const memoryConfig = {
  type: 'memory',
  label: 'Memory',
  icon: IconMemory,
  accent: 'memory',
  width: 220,
  height: 132,
  description: 'Persists state across pipeline steps.',
  fields: [
    {
      name: 'scope',
      label: 'Scope',
      type: 'select',
      options: ['Session', 'Global'],
      default: 'Session',
    },
    { name: 'maxEntries', label: 'Max entries', type: 'text', placeholder: '10' },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'write', label: 'write' },
    { type: 'source', position: 'right', id: 'read', label: 'read' },
  ],
};

export const MemoryNode = (props) => <BaseNode {...props} config={memoryConfig} />;
