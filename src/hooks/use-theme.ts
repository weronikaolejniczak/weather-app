import { useEffect } from 'react';

import { Theme } from '@/constants/theme';

import { usePersistentState } from './use-persistent-state';
import { useMatchMedia } from './use-media-query';

const THEME_PREFERENCE_KEY = 'theme';

export const useTheme = () => {
  const [theme, setTheme] = usePersistentState<Theme>(
    THEME_PREFERENCE_KEY,
    Theme.Light,
  );

  const prefersDarkMode = useMatchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    const isDarkTheme =
      theme === Theme.Dark ||
      (!(THEME_PREFERENCE_KEY in localStorage) && prefersDarkMode);

    if (isDarkTheme) {
      document.documentElement.classList.add(Theme.Dark);
    } else {
      document.documentElement.classList.remove(Theme.Dark);
    }
  }, [theme, prefersDarkMode, setTheme]);

  const toggleTheme = () =>
    setTheme((value) => (value === Theme.Dark ? Theme.Light : Theme.Dark));

  return { theme, setTheme, toggleTheme };
};
