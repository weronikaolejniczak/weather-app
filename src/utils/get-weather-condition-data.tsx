import { WeatherConditionCode } from '@/api/types';

import BrokenCloudsIcon from '@/assets/icons/broken-clouds.svg?react';
import ClearSkyIcon from '@/assets/icons/clear-sky.svg?react';
import FewCloudsIcon from '@/assets/icons/few-clouds.svg?react';
import MistIcon from '@/assets/icons/mist.svg?react';
import RainIcon from '@/assets/icons/rain.svg?react';
import ScatteredCloudsIcon from '@/assets/icons/scattered-clouds.svg?react';
import ShowerRainIcon from '@/assets/icons/shower-rain.svg?react';
import SnowIcon from '@/assets/icons/snow.svg?react';
import ThunderstormIcon from '@/assets/icons/thunderstorm.svg?react';

const WEATHER_CONDIITON_MAP = {
  [WeatherConditionCode.ClearSky]: {
    icon: <ClearSkyIcon />,
    backdrop: { light: 'bg-clearSky-light', dark: 'bg-clearSky-dark' },
    description: 'clear sky',
  },
  [WeatherConditionCode.FewClouds]: {
    icon: <FewCloudsIcon />,
    backdrop: { light: 'bg-fewClouds-light', dark: 'bg-fewClouds-dark' },
    description: 'few clouds',
  },
  [WeatherConditionCode.ScatteredClouds]: {
    icon: <ScatteredCloudsIcon />,
    backdrop: {
      light: 'bg-scatteredClouds-light',
      dark: 'bg-scatteredClouds-dark',
    },
    description: 'scattered clouds',
  },
  [WeatherConditionCode.BrokenClouds]: {
    icon: <BrokenCloudsIcon />,
    backdrop: { light: 'bg-brokenClouds-light', dark: 'bg-brokenClouds-dark' },
    description: 'broken clouds',
  },
  [WeatherConditionCode.ShowerRain]: {
    icon: <ShowerRainIcon />,
    backdrop: { light: 'bg-showerRain-light', dark: 'bg-showerRain-dark' },
    description: 'shower rain',
  },
  [WeatherConditionCode.Rain]: {
    icon: <RainIcon />,
    backdrop: { light: 'bg-rain-light', dark: 'bg-rain-dark' },
    description: 'rain',
  },
  [WeatherConditionCode.Thunderstorm]: {
    icon: <ThunderstormIcon />,
    backdrop: { light: 'bg-thunderstorm-light', dark: 'bg-thunderstorm-dark' },
    description: 'thunderstorm',
  },
  [WeatherConditionCode.Snow]: {
    icon: <SnowIcon />,
    backdrop: { light: 'bg-snow-light', dark: 'bg-snow-dark' },
    description: 'snow',
  },
  [WeatherConditionCode.Mist]: {
    icon: <MistIcon />,
    backdrop: { light: 'bg-mist-light', dark: 'bg-mist-dark' },
    description: 'mist',
  },
};

type StrippedKeys = keyof typeof WEATHER_CONDIITON_MAP;

const isStrippedKey = (key: string): key is StrippedKeys => {
  return key in WEATHER_CONDIITON_MAP;
};

export const getWeatherConditionData = (key: string) => {
  const strippedKey = key.replace(/[dn]/i, '');

  if (isStrippedKey(strippedKey)) {
    return WEATHER_CONDIITON_MAP[strippedKey];
  } else {
    throw new Error(`Invalid key: ${strippedKey}`);
  }
};
