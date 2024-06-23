import { describe, it, expect } from 'vitest';

import { capitalizeWords } from './capitalize-words';

describe('Capitalize words utility', () => {
  it('Should capitalize the first letter of each word', () => {
    const input = 'hello world! this is a test.';
    const output = 'Hello World! This Is A Test.';

    expect(capitalizeWords(input)).toBe(output);
  });

  it('Should handle single words correctly', () => {
    const input = 'hello';
    const output = 'Hello';

    expect(capitalizeWords(input)).toBe(output);
  });

  it('Should handle empty strings correctly', () => {
    const input = '';
    const output = '';

    expect(capitalizeWords(input)).toBe(output);
  });

  it('Should handle strings with multiple spaces correctly', () => {
    const input = 'hello   world';
    const output = 'Hello   World';

    expect(capitalizeWords(input)).toBe(output);
  });

  it('Should handle strings with special characters correctly', () => {
    const input = 'hello-world';
    const output = 'Hello-World';

    expect(capitalizeWords(input)).toBe(output);
  });

  it('Should handle strings with numbers correctly', () => {
    const input = 'hello world 123';
    const output = 'Hello World 123';

    expect(capitalizeWords(input)).toBe(output);
  });

  it('Should handle strings with mixed case correctly', () => {
    const input = 'hElLo WoRLd';
    const output = 'HElLo WoRLd';

    expect(capitalizeWords(input)).toBe(output);
  });
});
