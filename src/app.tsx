import 'react';

import { Providers } from '@/providers';

import { Dashboard } from '@/pages/dashboard';

import { Toaster } from '@/components/ui/toaster';

export const App = () => {
  return (
    <Providers>
      <Dashboard />
      <Toaster />
    </Providers>
  );
};
