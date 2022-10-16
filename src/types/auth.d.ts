/// <reference types="typescript" />

// AUTHENTICATION
declare type Role = 'admin' | 'leader' | 'member';
declare type SignUpTokenResult = {
  expiresAt: string;
  usesRemaining: number;
  unitId: string;
  patrolId?: string;
  role: string;
};

declare type SignInParams = {
  username: string;
  password: string;
};

declare type SignUpParams = {
  username: string;
  password: string;
  token: string;
};

// States
declare type UserState = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  unitId?: string;
  patrolId?: string;
  role: Role;
  createdAt: string;
  lastSignedInAt: string;
};

declare type AuthState = {
  token: string | null;
  user: UserState | null;
  isValid: boolean;
  isLoading: boolean;
  error: Error | null;
};
// END AUTHENTICATION
