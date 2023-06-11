import { type NextFunction, type Request, type Response } from 'express';
import { SecurityConfiguration } from '../../../security.configuration';
import { UnauthorizedException } from '../../../../../shared/src/exceptions/unauthorized.exception';
import { ForbiddenException } from '../../../../../shared/src/exceptions/forbidden.exception';

export function RefreshTokenGuard(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const authHeader = request.headers.authorization;

    if (authHeader === undefined) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    if (token === undefined) {
      throw new UnauthorizedException();
    }

    const decodedToken = SecurityConfiguration
      .instance
      .randomTokenProvider
      .verify(token, 'refreshTokenSecret');

    if (!decodedToken) {
      throw new ForbiddenException();
    }

    (request as any).user = decodedToken;
    (request as any).token = token;

    next()
  } catch ({ httpCode, message }: any) {
    response.status(httpCode).json(message);
  }
}
