import { type Request } from 'express';

export type AuthenticatedRequest = Request & {
  user: {
    email: string
    username: string
    token: string
    uuid: string
  }
}
