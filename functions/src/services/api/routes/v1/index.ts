import * as express from 'express';

import adminRoute, { BASE_SLUG as ADMIN_SLUG } from './admin';
import authRoute, { BASE_SLUG as AUTH_SLUG } from './auth';
import usersRoute, { BASE_SLUG as USERS_SLUG } from './users';

export const BASE_SLUG = '/v1';
const v1 = express.Router();

v1.use(ADMIN_SLUG, adminRoute);
v1.use(AUTH_SLUG, authRoute);
v1.use(USERS_SLUG, usersRoute);

export default v1;
