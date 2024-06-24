import { WeatherCondition } from '../api/types';

import { Theme } from '../constants/theme';
import { BACKDROPS } from '../constants/backdrops';

type TransformedBackdrops = {
  [key in `${WeatherCondition}-${Theme}`]: string;
};

export const transformBackdrops = (): TransformedBackdrops => {
  const result: Partial<TransformedBackdrops> = {};

  Object.values(WeatherCondition).forEach((condition) => {
    const backdrop = BACKDROPS[condition];
    if (backdrop) {
      result[`${condition}-${Theme.Light}`] = `url('${backdrop.light.src}')`;
      result[`${condition}-${Theme.Dark}`] = `url('${backdrop.dark.src}')`;
    }
  });

  return result as TransformedBackdrops;
};
