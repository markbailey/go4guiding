// Common
declare type CompareFunction<T> = (value: T) => boolean;

// Authentication
declare type Role = 'admin' | 'leader' | 'member';
declare type UserClaims = {
  unitId: string | null;
  patrolId: string | null;
  role: Role;
};

declare interface User {
  uid: string;
  email?: string;
  emailVerified: boolean;
  displayName?: string;
  lastSignInTime: string;
  creationTime: string;

  role: Role;
  unitId?: string;
  patrolId?: string;
}

// Auth
declare interface SignUpToken {
  expiresAt: number;
  usesRemaining: number;
  unitId: string;
  patrolId?: string;
  role: Omit<Role, 'admin'>;
}

declare interface SignUpPayload {
  username: string;
  password: string;
  signUpTokenId: string;
}

// Requests
declare interface RequestError {
  status: number;
  message: string;
}

// Admin Request
declare interface SignInAsRequestBody {
  uid: string;
  url?: string;
}

declare interface SignInAsResponse {
  signInLink: string;
  returnLink: string;
  email: string;
  role: Role;
}

declare interface ForceSignOutRequestBody {
  uids: string[];
}
