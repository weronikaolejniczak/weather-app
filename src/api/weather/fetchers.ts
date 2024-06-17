import axios from 'axios';

import { Unit } from './types';
import { weatherSchema } from './schemas';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const DEFAULT_UNIT: Unit = Unit.metric;
const OPEN_WEATHER_MAP_VERSION = '2.5';
const OPEN_WEATHER_MAP_URI = `https://api.openweathermap.org/data/${OPEN_WEATHER_MAP_VERSION}/weather`;

export const fetchWeather = async (city: string) => {
  const response = await axios.get(OPEN_WEATHER_MAP_URI, {
    params: {
      q: city,
      appid: API_KEY,
      units: DEFAULT_UNIT,
    },
  });

  return weatherSchema.parse(response.data);
};
