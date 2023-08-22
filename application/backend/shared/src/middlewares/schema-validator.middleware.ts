import { type AnyZodObject } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';

export const SchemaValidator = (schema: AnyZodObject) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: request.body,
      query: request.query,
      params: request.params
    });

    next();
  } catch (error) {
    return response.status(400).json(error);
  }
}
