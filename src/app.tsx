import { Dashboard } from '@/pages/dashboard';
import { Providers } from '@/providers';
import { Toaster } from '@/components/ui/toaster';

export const App = () => {
  return (
    <Providers>
      <Dashboard />
      <Toaster />
    </Providers>
  );
};
