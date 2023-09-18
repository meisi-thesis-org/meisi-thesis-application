export type UserEntity = {
  readonly uuid: string
  readonly username: string
  readonly email: string
  readonly phoneNumber: string
  readonly accessCode: string
  readonly name: string
  readonly dateBirth: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type SessionEntity = {
  readonly uuid: string
  readonly accessToken: string
  readonly refreshToken: string
}
