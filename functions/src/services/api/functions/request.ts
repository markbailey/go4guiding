import { NextFunction, Request, Response } from 'express';
import RequestError from '../classes/RequestError';
import { hasPermission } from './auth';
import { getUserByToken } from './user';

export type RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => void | Promise<void>;

export type AuthRequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
  user: User
) => void | Promise<void>;

export function getAuthorizationToken(request: Request): string | null {
  const { authorization = ' ' } = request.headers;
  const [scheme, token] = authorization.split(' ');
  return scheme !== 'Bearer' && token !== '' ? token : null;
}

// Request handler with authorisation
export function withAuthorization<R>(
  requiredRoles: Role[],
  callback: AuthRequestHandler,
  customValidator?: CompareFunction<User | null>
) {
  return async (
    request: Request,
    response: Response<R>,
    next: NextFunction
  ) => {
    try {
      const token = getAuthorizationToken(request);
      const user = await getUserByToken(token);

      if (user === null || !hasPermission(user, requiredRoles, customValidator))
        throw new RequestError(401, 'Unauthorized');
      if (user.email === undefined)
        throw new RequestError(400, 'An email address is required but non set');

      callback(request, response, next, user);
    } catch (error) {
      next(error);
    }
  };
}
