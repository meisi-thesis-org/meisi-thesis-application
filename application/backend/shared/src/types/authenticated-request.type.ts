import { type Request } from 'express';

export type AuthenticatedRequest = Request & { user: {
  readonly uuid: string
  readonly username: string
  readonly email: string
  readonly phoneNumber: string
} }
