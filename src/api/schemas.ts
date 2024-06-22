import { z } from 'zod';

export const coordSchema = z.object({
  lon: z.number(),
  lat: z.number(),
});

export const weatherDescriptionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const mainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
});

export const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

export const cloudsSchema = z.object({
  all: z.number(),
});

export const rainSchema = z.object({
  '1h': z.number().optional(),
  '3h': z.number().optional(),
});

export const snowSchema = z.object({
  '1h': z.number().optional(),
  '3h': z.number().optional(),
});
