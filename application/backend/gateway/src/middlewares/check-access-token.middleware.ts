import axios from 'axios';
import { type NextFunction, type Request, type Response } from 'express';

export const checkAccessTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const unsecuredMethods = new Set<string>();

  unsecuredMethods.add('sign-in')
  unsecuredMethods.add('sign-up')
  unsecuredMethods.add('refresh-access-code')
  unsecuredMethods.add('refresh-tokens')

  const splittedURL = request.url.split('/')
  const isMethodUnsecured = unsecuredMethods.has(splittedURL[splittedURL.length - 1])

  if (!isMethodUnsecured) {
    await axios.get('http://localhost:8003/security/users/check-access-code', {
      headers: { Authorization: request.headers.authorization }
    }).catch((error) => response.status(error.response.status).json())
  }

  next()
}
