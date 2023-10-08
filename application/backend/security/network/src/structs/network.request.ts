import { type NetworkEntity } from './network.domain'

type FindNetworksByUserUuidRequest =
  Readonly<Pick<NetworkEntity, 'userUuid'>>
type FindNetworkByUuidRequest =
  Readonly<Pick<NetworkEntity, 'uuid'>>
type CreateNetworkRequest =
  Readonly<Pick<NetworkEntity, 'userUuid' | 'coordinateX' | 'coordinateY'>>
type UpdateNetworkByUuidRequest =
  Readonly<Pick<NetworkEntity, 'uuid'>> &
  Partial<Readonly<Pick<NetworkEntity, 'coordinateX' | 'coordinateY' | 'visible' | 'active'>>>

export type {
  FindNetworksByUserUuidRequest,
  FindNetworkByUuidRequest,
  CreateNetworkRequest,
  UpdateNetworkByUuidRequest
}
