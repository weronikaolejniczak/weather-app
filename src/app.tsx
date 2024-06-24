import 'react';

import { Dashboard } from '@/pages/dashboard';

import { Toaster } from '@/components/ui/toaster';

export const App = () => {
  return (
    <>
      <Dashboard />
      <Toaster />
    </>
  );
};
