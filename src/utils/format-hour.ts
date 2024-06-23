import { DEFAULT_LOCALE } from '@/constants';

export const formatHour = (date: Date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()))
    throw new Error('Pass a correct Date object');

  return date.toLocaleTimeString(DEFAULT_LOCALE, {
    timeStyle: 'short',
  });
};
