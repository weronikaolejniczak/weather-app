/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from 'vitest';

import { formatDate } from './format-date';

describe('Format date utility', () => {
  it('Should return a string "19:49 Monday, 17 June 24" when passing a date of epoch value `1718646542930`', () => {
    expect(formatDate(new Date(1718646542930))).toBe(
      '19:49 Monday, 17 June 24',
    );
  });

  it('Should throw the error "Pass a correct Date object" when passing `null`', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatDate(null)).toThrowError('Pass a correct Date object');
  });

  it('Should throw the error "Pass a correct Date object" when passing Invalid date', () => {
    expect(() => formatDate(new Date(8.64e15 + 1))).toThrowError(
      'Pass a correct Date object',
    );
  });
});
