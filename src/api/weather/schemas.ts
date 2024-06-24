import { z } from 'zod';

import {
  cloudsSchema,
  coordSchema,
  mainSchema,
  rainSchema,
  snowSchema,
  weatherDescriptionSchema,
  windSchema,
} from '../schemas';

const sysSchema = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  message: z.string().optional(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const weatherSchema = z.object({
  coord: coordSchema,
  weather: z.array(weatherDescriptionSchema),
  base: z.string(),
  main: mainSchema,
  visibility: z.number().optional(),
  wind: windSchema,
  clouds: cloudsSchema,
  rain: rainSchema.optional(),
  snow: snowSchema.optional(),
  dt: z.number(),
  sys: sysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});
