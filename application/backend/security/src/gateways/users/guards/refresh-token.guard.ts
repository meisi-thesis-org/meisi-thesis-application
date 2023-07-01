import { type NextFunction, type Request, type Response } from 'express'
import { UnauthorizedException } from '../../../shared/exceptions/unauthorized.exception';
import { SecurityConfiguration } from '../../../security.configuration';

export const RefreshTokenGuard = (
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

    const verifiedToken = SecurityConfiguration
      .getInstance()
      .getTokenProvider()
      .verifyToken(token, process.env.JWT_REFRESH_TOKEN_SECRET);

    (request as any).user = verifiedToken;
    (request as any).token = token;

    next()
  } catch ({ httpCode }: any) {
    return response.status(httpCode);
  }
}
