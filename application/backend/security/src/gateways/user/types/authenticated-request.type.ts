import { type Request } from 'express';

export type AuthenticatedRequest = Request & {
  user: {
    uuid: string
    username: string
    email: string
  }
  token: string
}
