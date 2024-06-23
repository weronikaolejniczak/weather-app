/* eslint-disable @typescript-eslint/ban-ts-comment */

import { describe, expect, it } from 'vitest';

import { DEFAULT_LOCALE } from '@/constants';

import { formatHour } from './format-hour';

describe('Format hour utility', () => {
  it('Should returns a string "19:49" in DEFAULT_LOCALE when passing a date of epoch value `1718646542930`', () => {
    const mockDate = new Date(1718646542930);
    const formattedHour = mockDate.toLocaleTimeString(DEFAULT_LOCALE, {
      timeStyle: 'short',
    });

    expect(formatHour(mockDate)).toBe(formattedHour);
  });

  it('Should throw an error "Pass a correct Date object" when passing `null`', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatHour(null)).toThrowError('Pass a correct Date object');
  });

  it('Should throw an error "Pass a correct Date object" when passing `undefined`', () => {
    // @ts-expect-error
    // We expect the TS error but want to assert runtime safety
    expect(() => formatHour(undefined)).toThrowError(
      'Pass a correct Date object',
    );
  });

  it('Should throw an error "Pass a correct Date object" when passing an invalid date', () => {
    expect(() => formatHour(new Date('invalid-date'))).toThrowError(
      'Pass a correct Date object',
    );
  });

  it('Should return the correct formatted hour when passing a valid date object', () => {
    const mockDate = new Date('2024-06-17T12:34:00Z');
    const formattedHour = mockDate.toLocaleTimeString(DEFAULT_LOCALE, {
      timeStyle: 'short',
    });

    expect(formatHour(mockDate)).toBe(formattedHour);
  });
});
