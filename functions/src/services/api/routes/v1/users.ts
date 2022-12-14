import * as express from 'express';
import { UserRecord } from 'firebase-functions/v1/auth';

import RequestError from '../../classes/RequestError';
import { withAuthorization } from '../../functions/request';
import { getUsers } from '../../functions/user';

export const BASE_SLUG = '/users';
const users = express.Router();

users.get(
  '/getByUnit/:unitId',
  withAuthorization<User[]>(
    ['leader', 'member'],
    async (request, response, next, currentUser: User) => {
      const { unitId } = request.params;

      try {
        if (currentUser.unitId === undefined || currentUser.unitId !== unitId)
          throw new RequestError(401, 'Unauthorized');

        const filter = (user: UserRecord) =>
          user.customClaims?.unitId === unitId;
        const users = await getUsers(undefined, filter);
        response.status(200).json(users);
      } catch (error) {
        next(error);
      }
    }
  )
);

users.get(
  '/getByPatrol/:patrolId',
  withAuthorization<User[]>(
    ['member'],
    async (request, response, next, currentUser: User) => {
      const { patrolId } = request.params;

      try {
        if (
          currentUser.patrolId === undefined ||
          currentUser.patrolId !== patrolId
        )
          throw new RequestError(401, 'Unauthorized');
        const filter = (user: UserRecord) =>
          user.customClaims?.patrolId === patrolId;
        const users = await getUsers(undefined, filter);
        response.status(200).json(users);
      } catch (error) {
        next(error);
      }
    }
  )
);

export default users;
