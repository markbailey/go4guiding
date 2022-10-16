import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch
} from '@reduxjs/toolkit';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase';

const initialState: AuthState = {
  token: null,
  user: null,
  isValid: false,
  isLoading: true,
  error: null
};

// Redux Thunks
export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (user: User | null) => {}
);

// Events
export function onAuthChanged(
  dispatch: ThunkDispatch<AuthState, undefined, AnyAction>,
  onlyOnce: boolean = false
) {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    dispatch(verifyAuth(user));
    if (onlyOnce) unsubscribe();
  });
}

// Store slice
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

// export const {} = slice.actions;
export const reducer = slice.reducer;
