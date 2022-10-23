import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';

const { VITE_API_URL, VITE_API_VERSION } = import.meta.env;
export const apiVersion: number = parseFloat(VITE_API_VERSION || '1');
export const getUrlWithVersion = (url: string, version = apiVersion) =>
  `/v${version}${url}`;

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
  tagTypes: [],
  endpoints: (builder) => ({})
});

export default api;
