import { WeatherCondition } from '../api/types';
import { Theme } from '../constants/theme';

export type OriginalBackdrops = {
  [key in WeatherCondition]?: {
    [key in Theme]?: {
      [key: string]: unknown;
      src: string;
    };
  };
};

type TransformedBackdrops = {
  [key in `${WeatherCondition}-${Theme}`]: string;
};

export const transformBackdrops = (
  backdrops: OriginalBackdrops,
): TransformedBackdrops => {
  const result: Partial<TransformedBackdrops> = {};

  Object.values(WeatherCondition).forEach((condition) => {
    const backdrop = backdrops[condition];

    if (backdrop) {
      if (backdrop.light)
        result[`${condition}-${Theme.Light}`] = `url('${backdrop.light.src}')`;
      if (backdrop.dark)
        result[`${condition}-${Theme.Dark}`] = `url('${backdrop.dark.src}')`;
    }
  });

  return result as TransformedBackdrops;
};
