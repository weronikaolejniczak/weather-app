import { useState } from 'react';
import { useQuery } from 'react-query';

import { fetchForecast } from './fetchers';
import { Forecast } from './types';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

export const useForecast = (city: string) => {
  const [lastSuccessfulData, setLastSuccessfulData] = useState<Forecast | null>(
    null,
  );

  const query = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => fetchForecast(city),
    enabled: !!city && !!API_KEY,
    onSuccess: (data) => setLastSuccessfulData(data),
    onError: (error) => console.error(error),
  });

  return {
    ...query,
    data: null,
    forecast: query.isSuccess ? query.data : lastSuccessfulData,
  };
};
