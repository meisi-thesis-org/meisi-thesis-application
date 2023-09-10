import { NoAuthorizationException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/no-authorization.exception';
import { TokenProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/token.provider';
import { type AuthenticatedRequest } from '@meisi-thesis/application-backend-utilities-shared/src/types/authenticated-request.type';
import { type Request, type NextFunction, type Response } from 'express';

export const AccessTokenGuard = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader === undefined) throw new NoAuthorizationException();

    const token = authorizationHeader.split(' ')[1];

    if (token === '' || token === undefined || token === null) throw new NoAuthorizationException();

    const tokenPayload = new TokenProvider().verify(token, process.env.ACCESS_TOKEN_SECRET);

    (request as AuthenticatedRequest).user = tokenPayload as any;

    next();
  } catch (error: any) {
    response.status(error.getHttpCode()).json();
  }
}
