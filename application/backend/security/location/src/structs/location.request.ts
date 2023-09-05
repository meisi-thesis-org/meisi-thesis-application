import { type LocationEntity } from './location.domain'

type FindLocationsByUserUuidRequest =
  Readonly<Pick<LocationEntity, 'userUuid'>>
type FindLocationByUuidRequest =
  Readonly<Pick<LocationEntity, 'uuid'>>
type CreateLocationRequest =
  Readonly<Pick<LocationEntity, 'userUuid' | 'coordinateX' | 'coordinateY'>>
type UpdateLocationByUuidRequest =
  Readonly<Pick<LocationEntity, 'uuid'>> &
  Partial<Readonly<Pick<LocationEntity, 'coordinateX' | 'coordinateY' | 'visible' | 'active'>>>

export type {
  FindLocationsByUserUuidRequest,
  FindLocationByUuidRequest,
  CreateLocationRequest,
  UpdateLocationByUuidRequest
}
