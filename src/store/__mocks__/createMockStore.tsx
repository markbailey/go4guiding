import { configureStore } from '@reduxjs/toolkit';
import {
  Api,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query';
import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { ReplaceTagTypes } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';

import mockAuth from './mockAuth';

type AnyObject = Record<string, unknown>;
type MockBaseQueryFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  RetryOptions,
  AnyObject
>;

export type MockApi<TT extends string> = Api<
  MockBaseQueryFn,
  ReplaceTagTypes<Record<string, never>, TT>,
  'api',
  TT,
  typeof coreModuleName | typeof reactHooksModuleName
>;

function createMockStore<TT extends string>(api: MockApi<TT>) {
  return configureStore({
    reducer: {
      auth: mockAuth.reducer,
      [api.reducerPath]: api.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
      }).concat(...[api.middleware])
  });
}

export default createMockStore;
