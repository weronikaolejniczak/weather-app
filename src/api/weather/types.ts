import { z } from 'zod';

import { weatherSchema } from './schemas';

// source: https://openweathermap.org/weather-conditions
export enum WeatherCondition {
  thunderstorm = 'Thunderstorm',
  drizzle = 'Drizzle',
  rain = 'Rain',
  snow = 'Snow',
  atmosphere = 'Atmosphere',
  clear = 'Clear',
  clouds = 'Clouds',
}

// source: https://openweathermap.org/current#data
export enum Unit {
  imperial = 'imperial',
  metric = 'metric',
  standard = 'standard',
}

export type Weather = z.infer<typeof weatherSchema>;
