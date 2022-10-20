import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { ADMIN_UID, auth } from '../../../firebase';

export function reMapUserRecord(user: UserRecord): User {
  const { uid, email, emailVerified, displayName, metadata, customClaims } =
    user;
  const { lastSignInTime, creationTime } = metadata;

  const role = customClaims?.role;
  const unitId = customClaims?.unitId;
  const patrolId = customClaims?.patrolId;

  return {
    uid,
    email,
    emailVerified,
    displayName,
    lastSignInTime,
    creationTime,

    role,
    unitId,
    patrolId
  };
}

export async function getUserByToken(idToken: string | null) {
  if (idToken === null) return idToken;
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decodedToken.uid);
    return reMapUserRecord(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUsers(
  limit?: number,
  filterFn?: CompareFunction<UserRecord>
) {
  return (async function getFilteredUsers(
    limit?: number,
    nextPageToken?: string
  ): Promise<User[]> {
    const { users, pageToken } = await auth.listUsers(limit, nextPageToken);
    const filteredUsers = users.filter((user) => {
      const isAdmin = user.uid === ADMIN_UID;
      const isFiltered = typeof filterFn === 'function' ? filterFn(user) : true;
      return !isAdmin && isFiltered;
    });

    if (pageToken)
      // List next batch of users.
      return await getFilteredUsers(limit, pageToken);

    return filteredUsers.map(reMapUserRecord);
  })(limit);
}
