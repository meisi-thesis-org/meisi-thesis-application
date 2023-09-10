type SessionEntity = {
  userUuid: string
  hashedAccessToken: string
  hashedRefreshToken: string
}
type SessionDTO = Readonly<SessionEntity>
const sessionMapper = (sessionEntity: SessionEntity): SessionDTO => {
  return {
    userUuid: sessionEntity.userUuid,
    hashedAccessToken: sessionEntity.hashedAccessToken,
    hashedRefreshToken: sessionEntity.hashedRefreshToken
  }
}

export {
  type SessionEntity,
  type SessionDTO,
  sessionMapper
}
