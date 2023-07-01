import { type Request, type Response, type NextFunction } from 'express';
import { type AnyZodObject } from 'zod';
import { HttpCodeCollection } from '../collections/http-code.collection';

export const SchemaValidatorMiddleware = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      return res.status(HttpCodeCollection.BAD_REQUEST).json(error);
    }
  };
