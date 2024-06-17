import { useQuery } from 'react-query';

import { fetchWeather } from './fetchers';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

export const useWeather = (city: string) => {
  return useQuery(['weather', city], () => fetchWeather(city), {
    enabled: !!city && !!API_KEY,
  });
};
