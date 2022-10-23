import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

const db = createApi({
  reducerPath: 'db',
  baseQuery: fakeBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({})
});

export default db;
