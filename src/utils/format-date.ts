export const formatDate = (date: Date) => {
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const day = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const dayMonthYear = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });

  return `${time} ${day}, ${dayMonthYear}`;
};
