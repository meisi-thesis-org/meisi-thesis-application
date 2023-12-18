import { type NetworkEntity, type NetworkDTO } from './structs/network.domain';

export interface NetworkRepository {
  findNetworksByUserUuid(userUuid: string | undefined): Promise<NetworkDTO[]>
  findNetworkByUuid(uuid: string): Promise<NetworkDTO | undefined>
  findNetworkByProps(
    userUuid: string,
    latitude: number,
    longitude: number
  ): Promise<NetworkDTO | undefined>
  createNetwork(networkEntity: NetworkEntity): Promise<void>
  updateNetworkByUuid(uuid: string, networkEntity: Omit<NetworkEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<NetworkEntity | undefined>
}
