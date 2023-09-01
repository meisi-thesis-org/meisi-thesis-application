import { ForbiddenException } from '@meisi-thesis/application-backend-shared/src/exceptions/forbidden.exception';
import { type Request, type NextFunction, type Response } from 'express';
import { TokenProvider } from '../providers/token.provider';
import { type AuthenticatedRequest } from '@meisi-thesis/application-backend-shared/src/types/authenticated-request.type';

export const refreshTokenGuard = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  const authorizationHeader = request.headers.authorization;

  if (authorizationHeader === undefined) throw new ForbiddenException();

  const token = authorizationHeader.split(' ')[1];

  if (token === '' || token === undefined || token === null) throw new ForbiddenException();

  const tokenPayload = new TokenProvider().verify(token, process.env.REFRESH_TOKEN_SECRET);

  (request as AuthenticatedRequest).user = tokenPayload as any;

  next();
}
