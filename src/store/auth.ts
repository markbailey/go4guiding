import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch
} from '@reduxjs/toolkit';

import {
  Auth,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { getMyUnit } from '../services/firebase';

const EMAIL_SUFFIX = import.meta.env.VITE_EMAIL_SUFFIX;
const EMPTY_STATE = { token: null, user: null };
const initialState: AuthState = {
  token: null,
  user: null,
  isValid: false,
  isLoading: true,
  error: null
};

// Redux Thunks
export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => await signOutOfFirebase(auth)
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (params: SignInParams) => {
    const { username, password } = params;
    const emailAddress = `${username}${EMAIL_SUFFIX}`;
    await signInWithEmailAndPassword(auth, emailAddress, password);
  }
);

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (user: User | null, { dispatch }) => {
    if (user === null) return { ...EMPTY_STATE };
    const { claims } = await user.getIdTokenResult();
    const { unitId, patrolId, role } = claims as UserClaims;
    const { displayName, email, uid, emailVerified, metadata } = user;
    const { creationTime, lastSignInTime } = metadata;

    const createdAt = creationTime
      ? new Date(creationTime).toLocaleDateString()
      : null;
    const lastSignedInAt = lastSignInTime
      ? new Date(lastSignInTime).toLocaleDateString()
      : null;

    // Get the users Unit
    const myUnitResult = dispatch(getMyUnit(unitId));
    myUnitResult.unsubscribe();
    const { data } = await myUnitResult;

    const token = await user.getIdToken();
    const signedInUser = {
      uid,
      email: email!,
      emailVerified,
      displayName,
      unit: data!,
      patrolId,
      role,
      createdAt,
      lastSignedInAt
    };

    return {
      token,
      user: signedInUser
    };
  }
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

export function onTokenChanged(
  dispatch: ThunkDispatch<AuthState, undefined, AnyAction>,
  onlyOnce: boolean = false
) {
  const unsubscribe = onIdTokenChanged(auth, async (user) => {
    dispatch(verifyAuth(user));
    if (onlyOnce) unsubscribe();
  });
}

// Store slice
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Verify Auth
    builder.addCase(verifyAuth.fulfilled, (state, action) => {
      if (!action.payload) return;
      const { token, user } = action.payload;

      state.token = token;
      state.user = user as UserState | null;
      state.isValid = user !== null && token !== null;
      state.isLoading = user?.role === null;
      state.error = null;
    });

    builder.addCase(verifyAuth.rejected, (state, action) => {
      state.error = action.payload as Error | null;
      state.isValid = false;
      state.isLoading = false;
    });
  }
});

// export const {} = slice.actions;
export const reducer = slice.reducer;
function signOutOfFirebase(auth: Auth): any {
  throw new Error('Function not implemented.');
}
