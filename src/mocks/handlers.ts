import { handlers as weatherHandlers } from './weather';
import { handlers as forecastHandlers } from './forecast';

export const handlers = [...weatherHandlers, ...forecastHandlers];
