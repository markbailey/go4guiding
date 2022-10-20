import { db, getSnapshotValue } from '../../../firebase';

// Verify user has permission to access a resource
export function hasPermission(
  user: User,
  requiredRoles: Role[],
  customValidator?: CompareFunction<User | null>
): boolean {
  const hasPermission =
    requiredRoles.includes(user.role) || requiredRoles.length === 0;
  return hasPermission && (customValidator?.(user) || true);
}

// Get sign-up token
export async function getSignUpToken(tokenId: string) {
  const token = await getSnapshotValue<SignUpToken>(`signUpTokens/${tokenId}`);
  const expiryDate = new Date(token?.expiresAt || '01/01/1970');
  const isExpired = expiryDate < new Date();
  return token === undefined || token.usesRemaining < 1 || isExpired
    ? null
    : token;
}

// Update sign-up token
export async function updateSignUpToken(tokenId: string) {
  const ref = db.ref(`signUpTokens/${tokenId}/usesRemaining`);
  return await ref.transaction((usesRemaining: number) => usesRemaining - 1);
}
