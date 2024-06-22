import ClearSkyIcon from '@/assets/icons/clear-sky.svg?react';
import FewCloudsIcon from '@/assets/icons/few-clouds.svg?react';
import ScatteredCloudsIcon from '@/assets/icons/scattered-clouds.svg?react';
import BrokenCloudsIcon from '@/assets/icons/broken-clouds.svg?react';
import ShowerRainIcon from '@/assets/icons/shower-rain.svg?react';
import RainIcon from '@/assets/icons/rain.svg?react';
import ThunderstormIcon from '@/assets/icons/thunderstorm.svg?react';
import SnowIcon from '@/assets/icons/snow.svg?react';
import MistIcon from '@/assets/icons/mist.svg?react';

const WEATHER_CONDIITON_MAP = {
  '01': {
    icon: <ClearSkyIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'clear sky',
  },
  '02': {
    icon: <FewCloudsIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'few clouds',
  },
  '03': {
    icon: <ScatteredCloudsIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'scattered clouds',
  },
  '04': {
    icon: <BrokenCloudsIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'broken clouds',
  },
  '09': {
    icon: <ShowerRainIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'shower rain',
  },
  '10': {
    icon: <RainIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'rain',
  },
  '11': {
    icon: <ThunderstormIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'thunderstorm',
  },
  '13': {
    icon: <SnowIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
    description: 'snow',
  },
  '50': {
    icon: <MistIcon />,
    backdrop: { light: { src: '', author: '' }, dark: { src: '', author: '' } },
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
