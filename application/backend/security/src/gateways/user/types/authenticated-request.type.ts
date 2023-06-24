import { type Request } from 'express'

export type AuthenticatedRequest = Request & {
  user: {
    uuid: string
    email: string
    token: string
  }
}
