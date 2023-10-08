import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { networkMapper, type NetworkDTO, type NetworkEntity } from './structs/network.domain';
import { type UpdateNetworkByUuidRequest, type CreateNetworkRequest, type FindNetworkByUuidRequest, type FindNetworksByUserUuidRequest } from './structs/network.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { type NetworkRepository } from './network.repository';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { NetworkStateRepository } from './repositories/network-state.repository';

export class NetworkService {
  private readonly repository: NetworkRepository = new NetworkStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findNetworksByUserUuid (
    findNetworksByUserUuidRequest: FindNetworksByUserUuidRequest
  ): Promise<NetworkDTO[]> {
    const foundNetworks = await this.repository
      .findNetworksByUserUuid(findNetworksByUserUuidRequest.userUuid)
      .catch(() => { throw new InternalServerException(); })

    const mappedNetworks = new Array<NetworkDTO>();

    for (const foundNetwork of foundNetworks) {
      mappedNetworks.push(networkMapper(foundNetwork));
    }

    return mappedNetworks
  }

  public async findNetworkByUuid (
    findNetworkByUuidRequest: FindNetworkByUuidRequest
  ): Promise<NetworkDTO> {
    const foundNetwork = await this.repository
      .findNetworkByUuid(findNetworkByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundNetwork === undefined) throw new NonFoundException();

    return networkMapper(foundNetwork);
  }

  public async createNetwork (
    createNetworkRequest: CreateNetworkRequest
  ): Promise<NetworkDTO> {
    const foundNetwork = await this.repository
      .findNetworkByProps(
        createNetworkRequest.userUuid,
        createNetworkRequest.coordinateX,
        createNetworkRequest.coordinateY
      ).catch(() => { throw new InternalServerException(); })

    if (foundNetwork !== undefined) throw new ConflictException();

    await this.networkProvider.doHttpRequest(
      '8001',
      'security/users',
      'GET',
      undefined,
      { userUuid: createNetworkRequest.userUuid }
    )

    const createdNetwork: NetworkEntity = {
      uuid: this.randomProvider.randomUUID(),
      userUuid: createNetworkRequest.userUuid,
      coordinateX: createNetworkRequest.coordinateX,
      coordinateY: createNetworkRequest.coordinateY,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toString()
    }

    await this.repository
      .createNetwork(createdNetwork)
      .catch(() => { throw new InternalServerException(); })

    return networkMapper(createdNetwork);
  }

  public async updateNetworkByUuid (
    updateNetworkByUuidRequest: UpdateNetworkByUuidRequest
  ): Promise<NetworkDTO> {
    const foundNetwork = await this.repository
      .findNetworkByUuid(updateNetworkByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundNetwork === undefined) throw new NonFoundException();

    const toUpdateNetwork: Omit<NetworkEntity, 'uuid' | 'userUuid' | 'createdAt'> = {
      coordinateX: updateNetworkByUuidRequest.coordinateX ?? foundNetwork.coordinateX,
      coordinateY: updateNetworkByUuidRequest.coordinateY ?? foundNetwork.coordinateY,
      visible: updateNetworkByUuidRequest.visible ?? foundNetwork.visible,
      active: updateNetworkByUuidRequest.active ?? foundNetwork.active,
      updatedAt: new Date().toISOString()
    }

    const updatedNetwork = await this.repository
      .updateNetworkByUuid(foundNetwork.uuid, toUpdateNetwork)
      .catch(() => { throw new InternalServerException(); })

    if (updatedNetwork === undefined) throw new NonFoundException();

    return networkMapper(updatedNetwork);
  }
}
