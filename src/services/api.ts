import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const { VITE_API_URL } = import.meta.env;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // mode: 'cors',
    // credentials: 'include',
    baseUrl: VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Admin'],
  endpoints: (builder) => ({})
});

export default api;
