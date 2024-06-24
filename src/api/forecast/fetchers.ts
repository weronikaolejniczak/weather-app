import axios from 'axios';

import { DEFAULT_UNIT } from '@/constants';

import { Endpoint } from '../endpoints';

import { forecastSchema } from './schemas';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const NUMBER_OF_3H_IN_DAY = 8;

export const fetchForecast = async (city: string) => {
  const response = await axios.get(Endpoint.forecast, {
    params: {
      q: city,
      appid: API_KEY,
      units: DEFAULT_UNIT,
      cnt: NUMBER_OF_3H_IN_DAY,
    },
  });

  return forecastSchema.parse(response.data);
};
