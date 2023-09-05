import { type UserEntity } from './user.domain';

type FindUserByUuidRequest =
  Readonly<Pick<UserEntity, 'uuid'>>
type FindUserByAccessCodeRequest =
  Readonly<Pick<UserEntity, 'accessCode'>>
type CreateUserRequest =
  Readonly<Pick<UserEntity, 'username' | 'email' | 'phoneNumber'>>
type UpdateUserByUuidRequest =
  Readonly<Pick<UserEntity, 'uuid'>> &
  Partial<Readonly<Omit<UserEntity, 'createdAt' | 'updatedAt'>>>
type UpdateUserAccessCodeRequest =
  Partial<Readonly<Pick<UserEntity, 'username' | 'email' | 'phoneNumber'>>>

export type {
  FindUserByUuidRequest,
  FindUserByAccessCodeRequest,
  CreateUserRequest,
  UpdateUserByUuidRequest,
  UpdateUserAccessCodeRequest
}
