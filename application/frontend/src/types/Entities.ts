type UserEntity = {
  readonly uuid: string
  username: string
  email: string
  phoneNumber: string
  name: string
  dateBirth: string
  createdAt: string
  updatedAt: string
}

type SessionEntity = {
  userUuid: string
  accessToken: string
  refreshToken: string
}

type NetworkEntity = {
  readonly uuid: string
  readonly userUuid: string
  latitude: number
  longitude: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type DeviceEntity = {
  readonly uuid: string
  readonly userUuid: string
  userAgent: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type DossierEntity = {
  readonly uuid: string
  readonly userUuid: string
  designation: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type BookEntity = {
  readonly uuid: string
  readonly dossierUuid: string
  designation: string
  description: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type ChapterEntity = {
  readonly uuid: string
  readonly bookUuid: string
  designation: string
  description: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type PageEntity = {
  readonly uuid: string
  readonly chapterUuid: string
  description: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

export type {
  UserEntity,
  SessionEntity,
  NetworkEntity,
  DeviceEntity,
  DossierEntity,
  BookEntity,
  ChapterEntity,
  PageEntity
}
