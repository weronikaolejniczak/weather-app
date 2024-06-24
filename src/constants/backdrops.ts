import { WeatherCondition } from '../api/types';
import { Theme } from './theme';

export type Backdrop = {
  [key in Theme]: {
    url: string;
    src: string;
    author: string;
  };
};

export type Backdrops = {
  [key in WeatherCondition]: Backdrop;
};

export const BACKDROPS: Backdrops = {
  [WeatherCondition.ClearSky]: {
    light: {
      url: 'https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-lX5wMeZUidA',
      src: '/assets/backdrops/light/cate-bligh-lX5wMeZUidA-unsplash.jpg',
      author: 'Cate Bligh',
    },
    dark: {
      url: 'https://unsplash.com/photos/starry-night-iFGZbWs2qSA',
      src: '/assets/backdrops/dark/paul-volkmer-iFGZbWs2qSA-unsplash.jpg',
      author: 'Paul Volkmer',
    },
  },
  [WeatherCondition.FewClouds]: {
    light: {
      url: 'https://unsplash.com/photos/white-clouds-KM8yDRXV7yQ',
      src: '/assets/backdrops/light/andrei-lazarev-KM8yDRXV7yQ-unsplash.jpg',
      author: 'Andrei Lazarev',
    },
    dark: {
      url: 'https://unsplash.com/photos/photo-of-seashore-during-golden-hour-n44KHcbp1_E',
      src: '/assets/backdrops/dark/jernej-graj-n44KHcbp1_E-unsplash.jpg',
      author: 'Jernej Graj',
    },
  },
  [WeatherCondition.ScatteredClouds]: {
    light: {
      url: 'https://unsplash.com/photos/a-large-field-with-a-sky-filled-with-clouds-DJqJy3k1mCA',
      src: '/assets/backdrops/light/marco-bianchetti-DJqJy3k1mCA-unsplash.jpg',
      author: 'Marco Bianchetti',
    },
    dark: {
      url: 'https://unsplash.com/photos/low-angle-photography-of-white-clouds-j9ncMni2Xhs',
      src: '/assets/backdrops/dark/kym-mackinnon-j9ncMni2Xhs-unsplash.jpg',
      author: 'Kym MacKinnon',
    },
  },
  [WeatherCondition.BrokenClouds]: {
    light: {
      url: 'https://unsplash.com/photos/aerial-photograph-of-clouds-5D47VsGV86c',
      src: '/assets/backdrops/light/danist-soh-5D47VsGV86c-unsplash.jpg',
      author: 'Danist Soh',
    },
    dark: {
      url: 'https://unsplash.com/photos/sea-wave-during-sunset-nT-hGJLbn0s',
      src: '/assets/backdrops/dark/scott-van-hoy-nT-hGJLbn0s-unsplash.jpg',
      author: 'Scott van Hoy',
    },
  },
  [WeatherCondition.ShowerRain]: {
    light: {
      url: 'https://unsplash.com/photos/timelapse-photography-of-water-drops-pv2ZlDfstXc',
      src: '/assets/backdrops/light/inge-maria-pv2ZlDfstXc-unsplash.jpg',
      author: 'Inge Maria',
    },
    dark: {
      url: 'https://unsplash.com/photos/a-green-tree-with-lots-of-leaves-in-the-rain-s8LnUtWFmW0',
      src: '/assets/backdrops/dark/anik-deb-nath-s8LnUtWFmW0-unsplash.jpg',
      author: 'Anik Deb Nath',
    },
  },
  [WeatherCondition.Rain]: {
    light: {
      url: 'https://unsplash.com/photos/green-grass-with-water-droplets-63z4rEJBHao',
      src: '/assets/backdrops/light/thomas-couillard-63z4rEJBHao-unsplash.jpg',
      author: 'Thomas Couillard',
    },
    dark: {
      url: 'https://unsplash.com/photos/brown-brick-pavement-tRFehFzhlcc',
      src: '/assets/backdrops/dark/aleksandr-popov-tRFehFzhlcc-unsplash.jpg',
      author: 'Aleksandr Popov',
    },
  },
  [WeatherCondition.Thunderstorm]: {
    light: {
      url: 'https://unsplash.com/photos/lightning-strike-on-body-of-water-1cJXplTxrmI',
      src: '/assets/backdrops/light/raychel-sanner-1cJXplTxrmI-unsplash.jpg',
      author: 'Raychel Sanner',
    },
    dark: {
      url: 'https://unsplash.com/photos/photo-of-island-and-thunder-E-Zuyev2XWo',
      src: '/assets/backdrops/dark/johannes-plenio-E-Zuyev2XWo-unsplash.jpg',
      author: 'Johannes Plenio',
    },
  },
  [WeatherCondition.Snow]: {
    light: {
      url: 'https://unsplash.com/photos/trees-filled-with-snow-during-daytime-QLfjlyEamV4',
      src: '/assets/backdrops/light/stanley-dai-QLfjlyEamV4-unsplash.jpg',
      author: 'Stanley Dai',
    },
    dark: {
      url: 'https://unsplash.com/photos/person-walking-at-night-with-snow-UaxkX3rJh68',
      src: '/assets/backdrops/dark/roan-lavery-UaxkX3rJh68-unsplash.jpg',
      author: 'Roan Lavery',
    },
  },
  [WeatherCondition.Mist]: {
    light: {
      url: 'https://unsplash.com/photos/green-forest-covered-by-fog-F0rQieonv3c',
      src: '/assets/backdrops/light/rebecca-prest-F0rQieonv3c-unsplash.jpg',
      author: 'Rebecca Prest',
    },
    dark: {
      url: 'https://unsplash.com/photos/lighted-house-in-city-near-glacier-mountain-at-nighttime-_7hiYkKVmsk',
      src: '/assets/backdrops/dark/noah-grossenbacher-_7hiYkKVmsk-unsplash.jpg',
      author: 'Noah Grossenbacher',
    },
  },
};
