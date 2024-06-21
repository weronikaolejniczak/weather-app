import { useState } from 'react';
import { useQuery } from 'react-query';

import { usePersistentState } from '@/hooks/use-persistent-state';
import { SAVED_CITIES_KEY } from '@/constants';

import { fetchWeather } from './fetchers';
import { Weather } from './types';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

export const useWeather = (city: string) => {
  const [savedCities, setSavedCities] = usePersistentState<string[]>(
    SAVED_CITIES_KEY,
    [],
  );
  const [lastSuccessfulData, setLastSuccessfulData] = useState<Weather | null>(
    null,
  );

  const saveInLocalStorage = () => {
    const formattedCity = city.trim().toLowerCase();

    !savedCities.includes(formattedCity) &&
      setSavedCities((cities) => [...cities, formattedCity]);
  };

  const query = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    enabled: !!city && !!API_KEY,
    onSuccess: (data) => {
      setLastSuccessfulData(data);
      saveInLocalStorage();
    },
    onError: (error) => console.error(error),
  });

  return {
    ...query,
    data: null,
    weather: query.isSuccess ? query.data : lastSuccessfulData,
    savedQueries: savedCities,
  };
};
