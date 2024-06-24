# Weather Dashboard App

This is a repository for the Weather Dashboard app that allows users to search for the current weather conditions of any city.
The app fetches the data from a public weather API and displays it in a user-friendly manner.

[Hosted with Vercel](https://weather-app-lake-ten-91.vercel.app/)

![Collage](./demo/readme-collage.png)

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
- The app is **NOT pixel-perfect**, although styled according to the provided Figma. I preferred to focus on the functionality as opposed to getting the design details just right.
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

### Possible iterations

- I fetch the main weather data from the endpoint mentioned in the requirements: `https://api.openweathermap.org/data/2.5/weather` which doesn't return a forecast. So I call another endpoint to get it (3-hour for 5 days; hourly forecast is a Pro feature of OpenWeatherMap): `https://api.openweathermap.org/data/2.5/forecast`. In normal circumstances, I would negotiate using only the `/forecast` endpoint to show all data but for the recruitment challenge I preferred to follow the requirements.
- E2E tests using Cypress, Playwright. For this application, especially since I do not own the back-end, unit and integration tests with mocked endpoints are enough.
- I tried to follow Figma as closely as possible with some exceptions in responsitivity (like the sticky header on mobile) to save on time. I focused on implementing more functionalities over implementing them in detail to showcase versatility. In real circumstances or if I had more time, I would go for a pixel-perfect design.
- I would add stories for all UI components to showcase the building component library and its usage. I decided to make Combobox an exemplary case because it's a component written by me using composition pattern and Context API. Source: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none/
- I would try to add internalisation as soon as possible. It takes seconds to use it but almost all apps end up getting translated when scaling. I've worked with `react-i18next`, `react-intl` and custom in-house solution integrated with Lokalise.

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

**Note:** You can run the tests in [Vitest UI](https://vitest.dev/guide/ui) by running: `pnpm test:ui`

**Note:** You can generate coverage reports by running: `pnpm coverage`

### Run Storybook

1. First, install dependencies: `pnpm install`
2. Next, write in the terminal: `pnpm storybook`
3. Access http://localhost:6006/.
4. Et voila! 🎉
