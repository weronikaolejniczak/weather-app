import { handlers as forecastHandlers } from './forecast';
import { handlers as weatherHandlers } from './weather';

export const handlers = [...weatherHandlers, ...forecastHandlers];
