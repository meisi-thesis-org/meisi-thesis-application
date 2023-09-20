export type UserEntity = {
  uuid: string
  username: string
  email: string
  phoneNumber: string
  name: string
  dateBirth: string
  createdAt: string
  updatedAt: string
}

export type SessionEntity = {
  userUuid: string
  accessToken: string
  refreshToken: string
}
