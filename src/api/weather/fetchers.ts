import axios from 'axios';

import { DEFAULT_UNIT } from '@/constants';

import { Endpoint } from '../endpoints';

import { weatherSchema } from './schemas';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

export const fetchWeather = async (city: string) => {
  const response = await axios.get(Endpoint.weather, {
    params: {
      q: city,
      appid: API_KEY,
      units: DEFAULT_UNIT,
    },
  });

  return weatherSchema.parse(response.data);
};
