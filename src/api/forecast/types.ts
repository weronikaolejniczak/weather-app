import { z } from 'zod';

import { forecastSchema } from './schemas';

export type Forecast = z.infer<typeof forecastSchema>;
