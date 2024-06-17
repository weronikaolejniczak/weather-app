# Weather Dashboard App

This is a repository for the Weather Dashboard app that allows users to search for the current weather conditions of any city.
The app fetches the data from a public weather API and displays it in a user-friendly manner.

A front-end engineering assignment for the recruitment process at Knack.

[img]

Hosted with GitHub Pages: [url]

## Overview

### Stack

- TypeScript - for ensuring type-safety and improving developer experience
- React - for building the user interface in a scalable way
- Vite - for buiding and serving the project; it has been bootstrapped with [react-ts](https://vite.new/react-ts) template
- React Query - for handling requests
- Tailwind CSS - for styling
- shadcn/ui - for quick headless components
- Zod - for validating endpoints schema
- ESLint and Prettier - for ensuring clean, formatted code
- Vitest, React Testing Library and MSW - for unit and integration tests
- Playwright - for E2E tests
- Storybook - for building and showcasing UI components

### Functionalities

- Users can enter a city name in the search bar to get the current weather.
- Users can see the search history and choose cities from a dropdown for fast feedback.
- The app shows the current temperature, weather conditions, humidity, and wind speed for the searched city.
- Users can toggle between light and dark mode.
- App background changes depending on the reported weather (hot/cold/cloudy/rainy).

### Additional considerations

- The app is **responsive** on the desktop, tablet and mobile devices.
- The app is **accessible**, all interactive elements are announced by the screen reader correctly and the app is traversable by the keyboard.
- The app is **pixel-perfect**, styled according to the provided Figma.
- Errors have been handled in a meaningful way, considering the API documentation.
- The project was built with a component-driven approach using Storybook.
- Tests have been written following the TDD and BDD approach. GWT are written next to test cases.

## How to run

### Prerequisites

This application has been developed on Windows and Node v20.12.

For simplicity, there's a `.nvmrc`, on Unix-based systems you can run `nvm use` in the project root to load the correct version.

If you're having issues running the project, feel free to contact me at [wer.olejniczak@gmail.com](mailto:wer.olejniczak@gmail.com).

You need to add `.env` file with your free development API key from [openweathermap.org](https://openweathermap.org/):

```
OPEN_WEATHER_MAP_API_KEY=""
```

You can duplicate `.env-sample` file and rename the file to `.env`.

### Run development server

1. First, install dependencies: `pnpm install`
2. Next, write in the terminal: `pnpm dev`
3. Access http://localhost:5173/.

### Run unit and integration tests

1. WIP

### Run E2E tests

1. WIP

### Run Storybook

1. WIP
