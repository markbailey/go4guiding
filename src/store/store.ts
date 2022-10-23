import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import api from '../services/api';
import { db } from '../services/firebase';
import { reducer as authReducer } from './auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [db.reducerPath]: db.reducer,
    [api.reducerPath]: api.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, db.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
