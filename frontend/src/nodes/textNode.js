// textNode.js
// ---------------------------------------------------------------------
// Demonstrates the advanced hooks of the BaseNode abstraction:
//  - getDynamicHandles: every {{ valid_js_var }} in the text spawns a
//    target Handle on the left edge of the node.
//  - dynamicSize: the node grows/shrinks to fit the entered text.
//  - render: custom body content (variable badge strip) above the fields.
// ---------------------------------------------------------------------

import { BaseNode } from './BaseNode';
import { IconText } from '../components/icons';

export const extractVariables = (text) => {
  const regex = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) variables.push(match[1]);
  }
  return variables;
};

export const textConfig = {
  type: 'text',
  label: 'Text',
  icon: IconText,
  accent: 'text',
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      rows: 2,
      placeholder: 'Hello {{name}} ...',
    },
  ],
  handles: [{ type: 'source', position: 'right', id: 'output', label: 'output' }],
  getDynamicHandles: ({ text }) =>
    extractVariables(text).map((variable) => ({
      type: 'target',
      position: 'left',
      id: `var-${variable}`,
      label: variable,
      chip: false,
    })),
  dynamicSize: ({ text }) => {
    const lines = text.split('\n');
    const longestLine = Math.max(1, ...lines.map((line) => line.length));
    const variableCount = extractVariables(text).length;
    const varSpace = variableCount === 0 ? 0 : variableCount > 3 ? 52 : 26;
    return {
      width: Math.min(460, Math.max(240, longestLine * 7.8 + 56)),
      height: Math.min(380, Math.max(130, 130 + varSpace + Math.max(0, lines.length - 1) * 20)),
    };
  },
  render: ({ values }) => {
    const variables = extractVariables(values.text);
    if (!variables.length) return null;
    return (
      <div className="vs-var-strip">
        {variables.map((variable) => (
          <span key={variable} className="vs-var-badge" title={`{{ ${variable} }}`}>
            {variable}
          </span>
        ))}
      </div>
    );
  },
};

export const TextNode = (props) => <BaseNode {...props} config={textConfig} />;
