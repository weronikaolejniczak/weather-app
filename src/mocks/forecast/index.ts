import { http, HttpResponse } from 'msw';

import { Endpoint } from '@/api/endpoints';

export const handlers = [
  http.get(Endpoint.forecast, () => {
    return HttpResponse.json();
  }),
];
