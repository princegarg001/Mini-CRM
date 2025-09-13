import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  }
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getLeadStats: builder.query({
      query: () => '/reports/leads-by-status'
    })
  })
});

export const { useGetLeadStatsQuery } = baseApi;
