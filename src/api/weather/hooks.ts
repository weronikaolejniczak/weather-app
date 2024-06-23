import { useState } from 'react';
import { useQuery } from 'react-query';

import { usePersistentState } from '@/hooks/use-persistent-state';
import { SAVED_CITIES_KEY } from '@/constants';

import { fetchWeather } from './fetchers';
import { Weather } from './types';
import { isAxiosError } from 'axios';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

interface WeatherError {
  cod: string;
  message: string;
}

const isWeatherError = (error: unknown): error is WeatherError => {
  if (typeof error === 'object' && error !== null) {
    return 'cod' in error && 'message' in error;
  }
  return false;
};

interface Options {
  onError: (error: WeatherError) => void;
}

export const useWeather = (city: string, { onError }: Options) => {
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
    onError: (error) => {
      if (isAxiosError(error) && isWeatherError(error.response?.data)) {
        onError(error.response.data);
      }
    },
  });

  return {
    ...query,
    data: null,
    weather: query.isSuccess ? query.data : lastSuccessfulData,
    savedQueries: savedCities,
  };
};
