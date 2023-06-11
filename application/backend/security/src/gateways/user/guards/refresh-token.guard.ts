import { type Request, type Response, type NextFunction } from 'express';

export function RefreshTokenGuard(
  request: Request,
  response: Response,
  next: NextFunction
): boolean {
  return true;
}
