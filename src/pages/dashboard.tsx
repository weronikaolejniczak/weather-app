import { useMemo, useRef } from 'react';

import { useForecast } from '@/api/forecast';
import { useWeather } from '@/api/weather';

import { useDebounce } from '@/hooks/use-debounce';
import { useInput } from '@/hooks/use-input';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/use-theme';

import { capitalizeWords } from '@/utils/capitalize-words';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format-date';
import { formatHour } from '@/utils/format-hour';
import { getWeatherConditionData } from '@/utils/get-weather-condition-data';

import { Combobox } from '@/components/ui/combobox';
import { Logo } from '@/components/ui/logo';
import { Separator } from '@/components/ui/separator';
import { Table } from '@/components/ui/table';
import { ThemeToggle } from '@/components/theme-toggle';

import DropIcon from '@/assets/icons/drop.svg?react';
import LoadingSpinner from '@/assets/icons/loading-spinner.svg?react';
import MagnifierIcon from '@/assets/icons/magnifier.svg?react';
import TempMaxIcon from '@/assets/icons/temp-max.svg?react';
import TempMinIcon from '@/assets/icons/temp-min.svg?react';
import WindIcon from '@/assets/icons/wind.svg?react';

const DEFAULT_SEARCH_QUERY = 'Barcelona';
const SEARCH_DEBOUNCE_VALUE = 500;

export const Dashboard = () => {
  const toastId = useRef<string>('');

  const { dismiss, toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [searchQuery, handleSearchQueryChange, setSearchQuery] =
    useInput(DEFAULT_SEARCH_QUERY);

  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_VALUE);
  const { weather, savedQueries, isLoading } = useWeather(debouncedQuery, {
    onError: (error) => {
      const { id } = toast({
        title: 'Ooops, something went wrong!',
        description: error.message,
        variant: 'destructive',
      });
      toastId.current = id;
    },
    onSuccess: () => {
      dismiss(toastId.current);
    },
  });
  const { forecast } = useForecast(debouncedQuery);

  const autofillOptions = useMemo(() => {
    const formattedQuery = debouncedQuery.trim().toLowerCase();

    return savedQueries.filter((query) => query !== formattedQuery);
  }, [debouncedQuery, savedQueries]);

  const weatherConditions = useMemo(() => {
    if (!weather) return null;
    return getWeatherConditionData(weather.weather[0].icon);
  }, [weather]);

  return (
    <div
      className={cn(
        'min-h-screen w-full px-6 pt-6 flex flex-col gap-12 bg-cover bg-center bg-no-repeat bg-fixed',
        weatherConditions?.backdrop[theme],
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="w-full flex justify-center items-center">
          <Logo className="m-auto" />
          <ThemeToggle value={theme} onClick={toggleTheme} />
        </div>
        <Combobox>
          <Combobox.Label htmlFor="search-input" srOnly>
            Enter city
          </Combobox.Label>
          <Combobox.Input
            id="search-input"
            type="text"
            name="search-input"
            className="w-full"
            onChange={handleSearchQueryChange}
            value={searchQuery}
            icon={
              isLoading ? (
                <LoadingSpinner
                  className="animate-spin"
                  width="32"
                  height="32"
                />
              ) : (
                <MagnifierIcon />
              )
            }
          />
          {autofillOptions.length > 0 && (
            <Combobox.List id="cities" label="Previous city searches">
              {autofillOptions.map((option) => {
                const value = capitalizeWords(option);
                return (
                  <Combobox.Option
                    key={option}
                    value={value}
                    onClick={() => setSearchQuery(value)}
                  >
                    {value}
                  </Combobox.Option>
                );
              })}
            </Combobox.List>
          )}
        </Combobox>
      </div>
      <div className="w-full flex justify-center gap-4">
        {weather && (
          <div className="flex items-center">
            {weatherConditions && <span>{weatherConditions.icon}</span>}
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
      <div className="w-full flex flex-1 flex-col gap-6 p-4 backdrop-blur-2xl bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20 rounded-t-lg">
        {weather && (
          <div className="flex flex-col gap-6">
            <h3 className="self-center uppercase text-base font-medium">
              {weather.weather[0].description}
            </h3>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Head>Max</Table.Head>
                  <Table.Cell>
                    {Math.floor(weather?.main.temp_max)}°C
                    <TempMaxIcon />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Head>Min</Table.Head>
                  <Table.Cell>
                    {Math.floor(weather?.main.temp_min)}°C
                    <TempMinIcon />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Head>Humidity</Table.Head>
                  <Table.Cell>
                    {weather?.main.humidity}%
                    <DropIcon />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Head>Wind</Table.Head>
                  <Table.Cell>
                    {Math.floor(weather?.wind.speed)}km/h
                    <WindIcon />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        )}
        <Separator />
        {!!forecast?.list.length &&
          forecast?.list.map(({ dt_txt, weather, main }) => (
            <div key={dt_txt} className="py-1 px-2 flex gap-4 items-center">
              <span>{getWeatherConditionData(weather[0].icon).icon}</span>
              <div className="flex flex-col flex-1">
                <span className="text-lg">{formatHour(new Date(dt_txt))}</span>
                <span className="text-lg">{weather[0].description}</span>
              </div>
              <div className="text-2xl">
                {Math.floor(main.temp)}°<span className="text-lg">C</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
