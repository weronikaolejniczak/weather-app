// https://openweathermap.org/weather-conditions
export enum WeatherConditionCode {
  ClearSky = '01',
  FewClouds = '02',
  ScatteredClouds = '03',
  BrokenClouds = '04',
  ShowerRain = '09',
  Rain = '10',
  Thunderstorm = '11',
  Snow = '13',
  Mist = '50',
}

export enum WeatherCondition {
  ClearSky = 'clearSky',
  FewClouds = 'fewClouds',
  ScatteredClouds = 'scatteredClouds',
  BrokenClouds = 'brokenClouds',
  ShowerRain = 'showerRain',
  Rain = 'rain',
  Thunderstorm = 'thunderstorm',
  Snow = 'snow',
  Mist = 'mist',
}

// source: https://openweathermap.org/current#data
export enum Unit {
  imperial = 'imperial',
  metric = 'metric',
  standard = 'standard',
}
