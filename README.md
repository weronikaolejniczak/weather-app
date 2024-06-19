# Weather Dashboard App

This is a repository for the Weather Dashboard app that allows users to search for the current weather conditions of any city.
The app fetches the data from a public weather API and displays it in a user-friendly manner.

A front-end engineering assignment for the recruitment process at Knack.

[img]

Hosted with GitHub Pages: [url]

## Overview

### Stack

- **[TypeScript](https://www.typescriptlang.org/)** - for ensuring type-safety and improving developer experience
- **[React](https://react.dev/)** - for building the user interface in a scalable way
- **[Vite](https://vitejs.dev/)** - for buiding and serving the project; it has been bootstrapped with [react-ts](https://vite.new/react-ts) template
- **[React Query](https://tanstack.com/query/v3)** and **[Axios](https://github.com/axios/axios)** - for handling requests and client-side caching
- **[Tailwind CSS](https://tailwindcss.com/)** - for styling
- **[shadcn/ui](https://ui.shadcn.com/)** - for quick headless components
- **[Zod](https://zod.dev/)** - for validating endpoints schema
- **[ESLint](https://eslint.org/)** and **[Prettier](https://prettier.io/)** - for ensuring clean, formatted code
- **[Vitest](https://vitest.dev/)**, **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** and **[MSW](https://mswjs.io/)** - for unit and integration tests
- **[Playwright](https://playwright.dev/)** - for E2E tests
- **[Storybook](https://storybook.js.org/)** - for building and showcasing UI components

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
- I omitted routing because the app is simple enough but I structured the project in a way where it would be easy to add new pages.
- I didn't configure the CI/CD pipeline to save on time but have extensive experience setting them up and so I would:
  - Configure conventional commits and semantic releases
  - Build the app (set as a PR check)
  - Check linter and TypeScript (set as PR checks)
  - Run unit and integration tests (set as PR checks)
  - Deploy to a [AWS/GCP] bucket
  - Cache dependencies to avoid redundant reinstalling

## How to run

### Prerequisites

This application has been developed on Windows and Node v20.12.

For simplicity, there's a `.nvmrc`, on Unix-based systems you can run `nvm use` in the project root to load the correct version.

If you're having issues running the project, feel free to contact me at [wer.olejniczak@gmail.com](mailto:wer.olejniczak@gmail.com).

You need to add `.env` file with your free development API key from [openweathermap.org](https://openweathermap.org/):

```
VITE_OPEN_WEATHER_MAP_API_KEY=""
```

You can duplicate `.env-sample` file and rename the file to `.env` or `.env.development`.

You can read more about env in Vite [here](https://vitejs.dev/guide/env-and-mode).

### Run development server

1. First, install dependencies: `pnpm install`
2. Next, write in the terminal: `pnpm dev`
3. Access http://localhost:5173/.
4. Et voila! 🎉

### Run unit and integration tests

1. First, install dependencies: `pnpm install`
2. Next, write in the terminal: `pnpm test`
3. Et voila! 🎉

### Run E2E tests

1. WIP

### Run Storybook

1. WIP
