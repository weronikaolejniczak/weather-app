import { useWeather } from '../api/weather';
import { useDebounce } from '../hooks/use-debounce';
import { useInput } from '../hooks/use-input';
import { formatDate } from '../utils/format-date';

export const Dashboard = () => {
  const [searchQuery, handleSearchQueryChange] = useInput();

  const debouncedQuery = useDebounce(searchQuery, 1000);
  const query = useWeather(debouncedQuery);

  return (
    <div>
      <main>
        <div>
          <span>{query.data?.main?.temp}</span>
        </div>
        <div>
          <h1>{query.data?.name}</h1>
          {query.data?.dt && <p>{formatDate(new Date(query.data?.dt))}</p>}
        </div>
      </main>
      <aside>
        <input value={searchQuery} onChange={handleSearchQueryChange} />
        <div></div>
      </aside>
    </div>
  );
};
