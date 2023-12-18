import { type NetworkEntity } from './network.domain'

type FindNetworksByUserUuidRequest =
  Readonly<Pick<NetworkEntity, 'userUuid'>>
type FindNetworkByUuidRequest =
  Readonly<Pick<NetworkEntity, 'uuid'>>
type CreateNetworkRequest =
  Readonly<Pick<NetworkEntity, 'userUuid' | 'latitude' | 'longitude'>>
type UpdateNetworkByUuidRequest =
  Readonly<Pick<NetworkEntity, 'uuid'>> &
  Partial<Readonly<Pick<NetworkEntity, 'latitude' | 'longitude' | 'visible' | 'active'>>>

export type {
  FindNetworksByUserUuidRequest,
  FindNetworkByUuidRequest,
  CreateNetworkRequest,
  UpdateNetworkByUuidRequest
}
