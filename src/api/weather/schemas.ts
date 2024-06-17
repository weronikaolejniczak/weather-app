import { z } from 'zod';

const coordSchema = z.object({
  lon: z.number(),
  lat: z.number(),
});

const weatherDescriptionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const mainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
});

const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

const cloudsSchema = z.object({
  all: z.number(),
});

const rainSchema = z.object({
  '1h': z.number().optional(),
  '3h': z.number().optional(),
});

const snowSchema = z.object({
  '1h': z.number().optional(),
  '3h': z.number().optional(),
});

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
