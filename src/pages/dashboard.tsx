import { useMemo, useRef } from 'react';

import { useForecast } from '@/api/forecast';
import { useWeather } from '@/api/weather';

import { capitalizeWords } from '@/utils/capitalize-words';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format-date';
import { formatHour } from '@/utils/format-hour';
import { getWeatherConditionData } from '@/utils/get-weather-condition-data';

import { useDebounce } from '@/hooks/use-debounce';
import { useInput } from '@/hooks/use-input';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

import { Combobox } from '@/components/ui/combobox';
import { List } from '@/components/ui/list';
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
        description:
          error.cod === '404' ? "This city doesn't exist!" : error.message,
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
        'flex min-h-screen w-full flex-col justify-center lg:flex-row gap-12 lg:gap-24 lg:px-12 lg:pt-12 bg-cover bg-fixed bg-center bg-no-repeat px-6 pt-6',
        weatherConditions?.backdrop[theme],
      )}
    >
      <header className="flex flex-col grow lg:max-w-2xl gap-12 lg:mt-24">
        <div className="flex flex-col gap-8">
          <div className="flex w-full items-center justify-center">
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
        <div className="flex w-full items-center justify-center gap-4">
          {weather && (
            <div className="flex items-center lg:gap-4">
              {weatherConditions && (
                <span className="lg:scale-150">{weatherConditions.icon}</span>
              )}
              <span className="text-6xl lg:text-9xl tracking-tight">
                {Math.floor(weather.main.temp)}°
              </span>
              <span className="text-3xl lg:text-6xl">C</span>
            </div>
          )}
          <div className="flex flex-col gap-1 pl-4 lg:gap-2">
            <h1 className="text-3xl lg:text-6xl">{weather?.name}</h1>
            <span className="text-sm lg:text-lg">
              {weather?.dt && <p>{formatDate(new Date(weather?.dt))}</p>}
            </span>
          </div>
        </div>
      </header>
      <div className="flex w-full flex-1 flex-col gap-6 min-w-80 lg:max-w-xl rounded-t-lg bg-white bg-opacity-20 p-4 backdrop-blur-2xl dark:bg-black dark:bg-opacity-20">
        {weather && (
          <div className="flex flex-col gap-6">
            <h3 className="self-center text-base font-medium uppercase">
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
        {!!forecast?.list.length && (
          <List>
            {forecast?.list.map(({ dt_txt, weather, main }) => (
              <List.Item key={dt_txt}>
                <List.Item.Leading>
                  {getWeatherConditionData(weather[0].icon).icon}
                </List.Item.Leading>
                <List.Item.Content>
                  <List.Item.Title>
                    {formatHour(new Date(dt_txt))}
                  </List.Item.Title>
                  <List.Item.Description>
                    {weather[0].description}
                  </List.Item.Description>
                </List.Item.Content>
                <List.Item.Trailing>
                  <span className="text-2xl">
                    {Math.floor(main.temp)}°<span className="text-lg">C</span>
                  </span>
                </List.Item.Trailing>
              </List.Item>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};
