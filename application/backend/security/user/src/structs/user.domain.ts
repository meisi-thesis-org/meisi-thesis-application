type UserEntity = {
  readonly uuid: string
  username: string
  email: string
  phoneNumber: string
  accessCode: string
  firstName: string
  lastName: string
  dateBirth: string
  createdAt: string
  updatedAt: string
}
type UserDTO = Readonly<Omit<UserEntity, 'accessCode'>>
const userMapper = (userEntity: UserEntity): UserDTO => {
  return {
    uuid: userEntity.uuid,
    username: userEntity.username,
    email: userEntity.email,
    phoneNumber: userEntity.phoneNumber,
    firstName: userEntity.firstName,
    lastName: userEntity.lastName,
    dateBirth: userEntity.dateBirth,
    createdAt: userEntity.createdAt,
    updatedAt: userEntity.updatedAt
  }
}

export {
  type UserEntity,
  type UserDTO,
  userMapper
}
