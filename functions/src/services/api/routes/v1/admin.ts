import * as express from 'express';

import { auth } from '../../../../firebase';
import RequestError from '../../classes/RequestError';
import { withAuthorization } from '../../functions/request';
import { reMapUserRecord } from '../../functions/user';

export const BASE_SLUG = '/admin';
const admin = express.Router();

admin.post(
  '/signInAs',
  withAuthorization<SignInAsResponse>(
    ['leader'],
    async (request, response, next, currentUser: User) => {
      const { uid, url } = request.body as SignInAsRequestBody;
      const returnUrl = `${request.headers.referer}${url || ''}`;

      try {
        const userRecord = await auth.getUser(uid);
        const user = reMapUserRecord(userRecord);
        if (user?.email === undefined)
          throw new RequestError(404, 'User not found or no email set');

        const actionSettings = { handleCodeInApp: true, url: returnUrl };
        const signInLink = await auth.generateSignInWithEmailLink(
          user.email,
          actionSettings
        );

        const returnLink = await auth.generateSignInWithEmailLink(
          currentUser.email!,
          actionSettings
        );

        response.status(200).json({
          signInLink,
          returnLink,
          email: user.email,
          role: user.role
        });
      } catch (error) {
        next(error);
      }
    }
  )
);

admin.post('/forceSignOut', async (request, response, next) => {
  const { uids } = request.body as ForceSignOutRequestBody;

  try {
    for (let i = 0; i < uids.length; i++)
      await auth.revokeRefreshTokens(uids[i]);
    response.status(200).send('success');
  } catch (error) {
    next(error);
  }
});

export default admin;
