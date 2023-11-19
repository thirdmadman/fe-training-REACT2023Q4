import { HttpResponse, http } from 'msw';
import { API_URL } from '../../../constants';

export const handlers = [
  http.get(`${API_URL}/*`, () => {
    console.log('LOOOL :>> ');
    return HttpResponse.json({});
  }),
];
