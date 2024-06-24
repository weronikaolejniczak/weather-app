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
  pod: z.string(),
});

const forecastItemSchema = z.object({
  dt: z.number(),
  main: mainSchema,
  weather: z.array(weatherDescriptionSchema),
  clouds: cloudsSchema,
  wind: windSchema,
  visibility: z.number().optional(),
  pop: z.number().optional(),
  rain: rainSchema.optional(),
  snow: snowSchema.optional(),
  sys: sysSchema,
  dt_txt: z.string(),
});

export const forecastSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(forecastItemSchema),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: coordSchema,
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});
