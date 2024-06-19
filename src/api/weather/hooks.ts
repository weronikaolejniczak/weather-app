import { useQuery } from 'react-query';

import { fetchWeather } from './fetchers';
import { useState } from 'react';
import { Weather } from './types';
import { usePersistentState } from '../../hooks/use-persistent-state';
import { SAVED_CITIES_KEY } from '../../constants';

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
    !savedCities.includes(city) &&
      setSavedCities((cities) => [...cities, city]);
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
