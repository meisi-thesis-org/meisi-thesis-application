import { type NextFunction, type Request, type Response } from 'express';

const checkAuthenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  next();
}

export { checkAuthenticationMiddleware };
