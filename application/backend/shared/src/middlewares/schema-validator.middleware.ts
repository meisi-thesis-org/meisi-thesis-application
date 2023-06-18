import { type AnyZodObject } from 'zod';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { type NextFunction, type Request, type Response } from 'express';

export const SchemaValidatorMiddleware = (schema: AnyZodObject) => async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await schema.parseAsync({
      body: request.body,
      query: request.query,
      params: request.params
    });

    next();
  } catch (error) {
    return response.status(HttpCodeCollection.BAD_REQUEST).json(error);
  }
}
