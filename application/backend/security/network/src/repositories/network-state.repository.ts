import { type NetworkRepository } from '../network.repository';
import { type NetworkDTO, type NetworkEntity } from '../structs/network.domain';

export class NetworkStateRepository implements NetworkRepository {
  private readonly networkCollection: NetworkEntity[] = new Array<NetworkEntity>();

  public async findNetworksByUserUuid (
    userUuid: string | undefined
  ): Promise<NetworkDTO[]> {
    return this.networkCollection.filter((network) => network.userUuid === userUuid);
  }

  public async findNetworkByUuid (
    uuid: string
  ): Promise<NetworkDTO | undefined> {
    return this.networkCollection.find((network) => network.uuid === uuid);
  }

  public async findNetworkByProps (
    userUuid: string,
    latitude: number,
    longitude: number
  ): Promise<NetworkDTO | undefined> {
    return this.networkCollection.find((network) => {
      if (
        network.userUuid === userUuid &&
        network.latitude === latitude &&
        network.longitude === longitude
      ) return network

      return undefined
    });
  }

  public async createNetwork (
    networkEntity: NetworkEntity
  ): Promise<void> {
    this.networkCollection.push(networkEntity)
  }

  public async updateNetworkByUuid (
    uuid: string,
    networkEntity: Omit<NetworkEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<NetworkEntity | undefined> {
    return this.networkCollection.find((network) => {
      if (network.uuid === uuid) network = { ...network, ...networkEntity }
      return network
    })
  }
}
