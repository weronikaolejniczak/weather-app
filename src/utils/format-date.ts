import { DEFAULT_LOCALE } from '@/constants';

export const formatDate = (date: Date) => {
  if (!date || !(date instanceof Date))
    throw new Error('Pass a correct Date object');

  const time = date.toLocaleTimeString(DEFAULT_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const day = date.toLocaleDateString(DEFAULT_LOCALE, { weekday: 'long' });
  const dayMonthYear = date.toLocaleDateString(DEFAULT_LOCALE, {
    day: '2-digit',
    month: 'long',
    year: '2-digit',
  });

  return `${time} ${day}, ${dayMonthYear}`;
};
