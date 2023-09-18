type SessionEntity = {
  userUuid: string
  accessToken: string
  refreshToken: string
}
type SessionDTO = Readonly<SessionEntity>
const sessionMapper = (sessionEntity: SessionEntity): SessionDTO => {
  return {
    userUuid: sessionEntity.userUuid,
    accessToken: sessionEntity.accessToken,
    refreshToken: sessionEntity.refreshToken
  }
}

export {
  type SessionEntity,
  type SessionDTO,
  sessionMapper
}
