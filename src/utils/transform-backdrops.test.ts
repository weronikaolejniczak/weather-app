import { describe, expect, it } from 'vitest';

import { WeatherCondition } from '../api/types';
import { BACKDROPS } from '../constants/backdrops';
import { Theme } from '../constants/theme';

import { OriginalBackdrops, transformBackdrops } from './transform-backdrops';

describe('Transform backdrops utility', () => {
  it('Should return a TransformedBackdrops object with the correct keys and values', () => {
    const result = transformBackdrops(BACKDROPS);

    Object.values(WeatherCondition).forEach((condition) => {
      const backdrop = BACKDROPS[condition];
      if (backdrop) {
        const lightKey = `${condition}-${Theme.Light}` as const;
        const darkKey = `${condition}-${Theme.Dark}` as const;

        expect(result).toHaveProperty(lightKey);
        expect(result[lightKey]).toBe(`url('${backdrop.light.src}')`);

        expect(result).toHaveProperty(darkKey);
        expect(result[darkKey]).toBe(`url('${backdrop.dark.src}')`);
      }
    });
  });

  it('Should not include keys for weather conditions not present in BACKDROPS', () => {
    const result = transformBackdrops(BACKDROPS);
    const transformedKeys = Object.keys(result);

    Object.values(WeatherCondition).forEach((condition) => {
      if (!BACKDROPS[condition]) {
        const lightKey = `${condition}-${Theme.Light}`;
        const darkKey = `${condition}-${Theme.Dark}`;

        expect(transformedKeys).not.toContain(lightKey);
        expect(transformedKeys).not.toContain(darkKey);
      }
    });
  });

  it('Should return an empty object if BACKDROPS is empty', () => {
    const emptyBackdrops: OriginalBackdrops = {};
    const result = transformBackdrops(emptyBackdrops);

    expect(result).toEqual({});
  });

  it('Should handle a subset of WeatherCondition values', () => {
    const partialBackdrops = {
      [WeatherCondition.ClearSky]: BACKDROPS[WeatherCondition.ClearSky],
      [WeatherCondition.FewClouds]: BACKDROPS[WeatherCondition.FewClouds],
    };
    const result = transformBackdrops(partialBackdrops);

    expect(result).toHaveProperty(
      `${WeatherCondition.ClearSky}-${Theme.Light}`,
    );
    expect(result).toHaveProperty(`${WeatherCondition.ClearSky}-${Theme.Dark}`);
    expect(result).toHaveProperty(
      `${WeatherCondition.FewClouds}-${Theme.Light}`,
    );
    expect(result).toHaveProperty(
      `${WeatherCondition.FewClouds}-${Theme.Dark}`,
    );
  });
});
