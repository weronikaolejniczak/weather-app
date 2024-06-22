import { http, HttpResponse } from 'msw';

import { Endpoint } from '@/api/endpoints';

import successBarcelona from './success-response-barcelona.json';
import successParis from './success-response-paris.json';
import successWarsaw from './success-response-warsaw.json';
import errorResponse404 from './error-response-404.json';

const MOCKS = {
  Barcelona: successBarcelona,
  Paris: successParis,
  Warsaw: successWarsaw,
};

type City = keyof typeof MOCKS;

export const handlers = [
  http.get(Endpoint.weather, ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('q');

    if (!city) throw new Error('City has not been passed in query parameters!');
    if (!(city in MOCKS))
      return HttpResponse.json(errorResponse404, { status: 404 });

    return HttpResponse.json(MOCKS[city as City]);
  }),
];
