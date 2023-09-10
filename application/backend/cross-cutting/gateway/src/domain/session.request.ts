import { type SessionEntity } from './session.entity'

type SignInRequest = Readonly<Pick<SessionEntity, 'userUuid'>>
type SignOutRequest = Readonly<Pick<SessionEntity, 'userUuid'>>
type RefreshTokensRequest = Readonly<Pick<SessionEntity, 'userUuid'>>

export type {
  SignInRequest,
  SignOutRequest,
  RefreshTokensRequest
}
