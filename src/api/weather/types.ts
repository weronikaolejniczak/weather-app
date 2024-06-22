import { z } from 'zod';

import { weatherSchema } from './schemas';

export type Weather = z.infer<typeof weatherSchema>;
