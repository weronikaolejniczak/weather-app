import { Dashboard } from './pages/dashboard';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <Dashboard />
    </Providers>
  );
};
