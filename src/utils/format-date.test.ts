/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, test } from 'vitest';
import { formatDate } from './format-date';

describe('Format date utility', () => {
  test('Passing a date of epoch value `1718646542930` returns a string "19:49 Monday, 17 June 24"', () => {
    expect(formatDate(new Date(1718646542930))).toBe(
      '19:49 Monday, 17 June 24',
    );
  });

  test('Passing `null` throws an error "Pass a correct Date object"', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatDate(null)).toThrowError('Pass a correct Date object');
  });

  test('Invalid date throws an error "Pass a correct Date object"', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatDate(8.64e15 + 1)).toThrowError(
      'Pass a correct Date object',
    );
  });
});
