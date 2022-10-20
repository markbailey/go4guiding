import * as express from 'express';

import { auth as fbAuth } from '../../../../firebase';
import RequestError from '../../classes/RequestError';
import { getSignUpToken, updateSignUpToken } from '../../functions/auth';
import { reMapUserRecord } from '../../functions/user';

export const BASE_SLUG = '/auth';
const auth = express.Router();

enum Error {
  InvalidPayload = 'Invalid username, password or signUpTokenId',
  InvalidToken = 'Invalid signUp token'
}

auth.put('/signUp', async (request, response, next) => {
  try {
    const { username, password, signUpTokenId } = request.body as SignUpPayload;
    if (!username || !password || !signUpTokenId)
      throw new RequestError(400, Error.InvalidPayload);

    const email = `${username}${process.env.EMAIL_SUFFIX}`;
    const token = await getSignUpToken(signUpTokenId);
    if (token === null) throw new RequestError(400, Error.InvalidToken);

    const displayName = username
      .split('.')
      .map((value) => value.substring(0, 1).toUpperCase() + value.substring(1))
      .join(' ');

    const newUser = await fbAuth.createUser({
      email,
      emailVerified: true,
      password,
      displayName
    });

    const customClaims = {
      role: token.role,
      unitId: token.unitId,
      patrolId: token.patrolId
    };

    await fbAuth.setCustomUserClaims(newUser.uid, customClaims);
    updateSignUpToken(signUpTokenId);
    response.status(200).send(reMapUserRecord(newUser));
  } catch (error) {
    next(error);
  }
});

export default auth;
