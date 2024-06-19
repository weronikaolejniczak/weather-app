export const formatDate = (date: Date) => {
  if (!date || !(date instanceof Date))
    throw new Error('Pass a correct Date object');

  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const day = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const dayMonthYear = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: '2-digit',
  });

  return `${time} ${day}, ${dayMonthYear}`;
};
