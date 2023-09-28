import type { Locale, Theme } from './collections'

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

export type UserSettingEntity = {
  theme: Theme
  locale: Locale
}
