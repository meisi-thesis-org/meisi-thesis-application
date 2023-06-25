import { type NextFunction, type Request, type Response } from 'express'
import { TokenProvider } from '../providers/token.provider';
import { UnauthorizedException } from './../../../../../shared/src/exceptions/unauthorized.exception';
import { ForbiddenException } from './../../../../../shared/src/exceptions/forbidden.exception';

export const AccessTokenGuard = (
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  try {
    const authHeader = request.headers.authorization;

    if (authHeader === undefined) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    if (token === undefined) {
      throw new UnauthorizedException();
    }

    const decodedToken = new TokenProvider()
      .verify(token, 'accessTokenSecret');

    if (!decodedToken) {
      throw new ForbiddenException();
    }

    (request as any).user = decodedToken;
    (request as any).token = token;

    next()
  } catch ({ httpCode, message }: any) {
    return response.status(httpCode).json(message);
  }
}
