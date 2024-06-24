import { HttpResponse, http } from 'msw';

import { Endpoint } from '@/api/endpoints';

import defaultResponse from './default.json';

export const handlers = [
  http.get(Endpoint.forecast, () => {
    return HttpResponse.json(defaultResponse);
  }),
];
