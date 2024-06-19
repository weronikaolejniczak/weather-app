import { useMemo, useState } from 'react';

import { useWeather } from '@/api/weather';
import { useDebounce } from '@/hooks/use-debounce';
import { useInput } from '@/hooks/use-input';
import { formatDate } from '@/utils/format-date';

const DEFAULT_SEARCH_QUERY = 'Barcelona';
const SEARCH_DEBOUNCE_VALUE = 500;

export const Dashboard = () => {
  const [searchQuery, handleSearchQueryChange] = useInput(DEFAULT_SEARCH_QUERY);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_VALUE);
  const { weather, savedQueries, error, isLoading, isError } =
    useWeather(debouncedQuery);

  const autofillOptions = useMemo(
    () => savedQueries.filter((query) => query !== debouncedQuery),
    [debouncedQuery, savedQueries],
  );

  return (
    <div>
      <main>
        <div>logo</div>
        {weather && (
          <div>
            <span>icon</span>
            <span>{weather.main.temp}°C</span>
          </div>
        )}
        <div>
          <h1>{weather?.name}</h1>
          {weather?.dt && <p>{formatDate(new Date(weather?.dt))}</p>}
        </div>
      </main>
      <aside>
        <label>
          <span>City</span>
          <input
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onFocus={() => setIsSearchInputFocused(true)}
            onBlur={() => setIsSearchInputFocused(false)}
          />
          {isSearchInputFocused && !!autofillOptions.length && (
            <menu role="menu" aria-label="Previously searched cities">
              {autofillOptions.map((query) => (
                <li role="menuitem" key={query}>
                  {query}
                </li>
              ))}
            </menu>
          )}
          {isLoading && <span>Loading...</span>}
          {isError && error?.response.status === 404 && (
            <span>This city doesn't exist!</span>
          )}
        </label>
        {weather && (
          <div>
            <div>
              <span>{weather.weather[0].description}</span>
              <div>
                <span>Max</span>
                <div>
                  <span>{weather?.main.temp_max}°C</span>
                  <span>icon</span>
                </div>
              </div>
              <div>
                <span>Min</span>
                <div>
                  <span>{weather?.main.temp_min}°C</span>
                  <span>icon</span>
                </div>
              </div>
              <div>
                <span>Humidity</span>
                <div>
                  <span>{weather?.main.humidity}%</span>
                  <span>icon</span>
                </div>
              </div>
              <div>
                <span>Wind</span>
                <div>
                  <span>{weather?.wind.speed}km/h</span>
                  <span>icon</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
