import { useMemo } from 'react';

import { useWeather } from '@/api/weather';
import { useDebounce } from '@/hooks/use-debounce';
import { useInput } from '@/hooks/use-input';
import { formatDate } from '@/utils/format-date';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/ui/logo';

import TempMaxIcon from '@/assets/icons/temp-max.svg?react';
import TempMinIcon from '@/assets/icons/temp-min.svg?react';
import DropIcon from '@/assets/icons/drop.svg?react';
import WindIcon from '@/assets/icons/wind.svg?react';

const DEFAULT_SEARCH_QUERY = 'Barcelona';
const SEARCH_DEBOUNCE_VALUE = 500;
const IMAGE_PLACEHOLDER =
  'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=80&w=1942&auto=format&fit=crop';

export const Dashboard = () => {
  const [searchQuery, handleSearchQueryChange] = useInput(DEFAULT_SEARCH_QUERY);

  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_VALUE);
  const { weather, savedQueries, error, isError } = useWeather(debouncedQuery);

  const autofillOptions = useMemo(() => {
    const formattedQuery = debouncedQuery.trim().toLowerCase();

    return savedQueries.filter((query) => query !== formattedQuery);
  }, [debouncedQuery, savedQueries]);

  return (
    <div
      className={`min-h-screen w-full px-6 pt-6 flex flex-col gap-12 bg-cover bg-[url('${IMAGE_PLACEHOLDER}')]`}
    >
      <div className="flex flex-col items-center gap-8">
        <Logo />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="search-input">Enter city</Label>
          <Input
            id="search-input"
            list="cities"
            onChange={handleSearchQueryChange}
            value={searchQuery}
          />
          {autofillOptions.length > 0 && (
            <ul>
              {autofillOptions.map((option) => (
                <li key={option} value={option}>
                  {option}
                </li>
              ))}
            </ul>
          )}
          {isError && error?.response.status === 404 && (
            <span>This city doesn't exist!</span>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center gap-4">
        {weather && (
          <div>
            <span className="text-6xl tracking-tight">
              {Math.floor(weather.main.temp)}°
            </span>
            <span className="text-3xl">C</span>
          </div>
        )}
        <div className="flex flex-col gap-1 pl-4">
          <h1 className="text-3xl">{weather?.name}</h1>
          <span className="text-sm">
            {weather?.dt && <p>{formatDate(new Date(weather?.dt))}</p>}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col gap-6 p-4 backdrop-blur-2xl bg-white bg-opacity-20 rounded-t-lg">
        {weather && (
          <div className="flex flex-col gap-6">
            <h3 className="self-center uppercase text-base font-medium">
              {weather.weather[0].description}
            </h3>
            <div className="flex justify-between">
              <span className="text-lg">Max</span>
              <div className="flex gap-2 items-center">
                <span className="text-lg">
                  {Math.floor(weather?.main.temp_max)}°C
                </span>
                <TempMaxIcon />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Min</span>
              <div className="flex gap-2 items-center">
                <span className="text-lg">
                  {Math.floor(weather?.main.temp_min)}°C
                </span>
                <TempMinIcon />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Humidity</span>
              <div className="flex gap-2 items-center">
                <span className="text-lg">{weather?.main.humidity}%</span>
                <DropIcon />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Wind</span>
              <div className="flex gap-2 items-center">
                <span className="text-lg">
                  {Math.floor(weather?.wind.speed)}km/h
                </span>
                <WindIcon />
              </div>
            </div>
          </div>
        )}
        <Separator />
      </div>
    </div>
  );
};
