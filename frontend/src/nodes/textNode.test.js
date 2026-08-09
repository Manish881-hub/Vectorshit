// textNode.test.js

import { extractVariables, textConfig } from './textNode';

describe('extractVariables', () => {
  it('extracts unique valid JS variable names from double braces', () => {
    expect(extractVariables('Hello {{name}} and {{ name }} and {{age}}')).toEqual(['name', 'age']);
  });

  it('deduplicates repeated variables', () => {
    expect(extractVariables('{{input}} and {{input}} again')).toEqual(['input']);
  });

  it('ignores invalid variable names', () => {
    expect(extractVariables('{{1abc}} {{}} {{a b}} {{ a-b }}')).toEqual([]);
  });

  it('returns an empty array when there are no variables', () => {
    expect(extractVariables('plain text with no braces')).toEqual([]);
  });
});

describe('textConfig.dynamicSize', () => {
  it('grows with the longest line and line count', () => {
    const small = textConfig.dynamicSize({ text: 'hi' });
    const wide = textConfig.dynamicSize({ text: 'a'.repeat(50) });
    const tall = textConfig.dynamicSize({ text: 'a\nb\nc\nd\ne' });
    expect(wide.width).toBeGreaterThan(small.width);
    expect(tall.height).toBeGreaterThan(small.height);
  });

  it('reserves space for the variable badge strip', () => {
    const plain = textConfig.dynamicSize({ text: 'no vars' });
    const withVar = textConfig.dynamicSize({ text: '{{input}}' });
    expect(withVar.height).toBeGreaterThan(plain.height);
  });

  it('stays within min/max bounds', () => {
    const tiny = textConfig.dynamicSize({ text: '' });
    const huge = textConfig.dynamicSize({ text: 'x'.repeat(500) + '\n'.repeat(200) });
    expect(tiny.width).toBeGreaterThanOrEqual(240);
    expect(tiny.height).toBeGreaterThanOrEqual(130);
    expect(huge.width).toBeLessThanOrEqual(460);
    expect(huge.height).toBeLessThanOrEqual(380);
  });
});
