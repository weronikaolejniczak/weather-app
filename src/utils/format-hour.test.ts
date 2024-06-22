/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, test } from 'vitest';

import { DEFAULT_LOCALE } from '@/constants';

import { formatHour } from './format-hour';

describe('Format hour utility', () => {
  test('Passing a date of epoch value `1718646542930` returns a string "19:49" in DEFAULT_LOCALE', () => {
    const mockDate = new Date(1718646542930);
    const formattedHour = mockDate.toLocaleTimeString(DEFAULT_LOCALE, {
      timeStyle: 'short',
    });

    expect(formatHour(mockDate)).toBe(formattedHour);
  });

  test('Passing `null` throws an error "Pass a correct Date object"', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatHour(null)).toThrowError('Pass a correct Date object');
  });

  test('Passing `undefined` throws an error "Pass a correct Date object"', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatHour(undefined)).toThrowError(
      'Pass a correct Date object',
    );
  });

  test('Passing an invalid date throws an error "Pass a correct Date object"', () => {
    // We expect the TS error but want to assert runtime safety
    expect(() => formatHour(new Date('invalid-date'))).toThrowError(
      'Pass a correct Date object',
    );
  });

  test('Passing a valid date object returns the correct formatted hour', () => {
    const mockDate = new Date('2024-06-17T12:34:00Z');
    const formattedHour = mockDate.toLocaleTimeString(DEFAULT_LOCALE, {
      timeStyle: 'short',
    });

    expect(formatHour(mockDate)).toBe(formattedHour);
  });
});
