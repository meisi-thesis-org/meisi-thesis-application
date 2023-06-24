import { type NextFunction, type Request, type Response } from 'express'

export const AccessTokenGuard = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {}
