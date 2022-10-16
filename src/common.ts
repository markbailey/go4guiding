export enum Role {
  Admin = 'admin',
  Leader = 'leader',
  Member = 'member'
}

export enum StorageKey {
  SignInAsEmail = 'signInAs.email',
  SignInAsOrigin = 'signInAs.origin'
}

export const AdminRoles = [Role.Admin, Role.Leader];
