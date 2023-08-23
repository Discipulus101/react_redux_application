import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { FilmData } from '../models/models';
import { BASE_URL } from '../constants/constants';

export const filmAPI = createApi({
  reducerPath: 'filmAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    fetchAllFilms: build.query<FilmData[], number>({
      query: (pageSize: number) => ({
        url: '/character',
        params: {
          pageSize: pageSize,
        },
      }),
      transformResponse: (response: { data: FilmData[] }) => response.data,
    }),
  }),
});
