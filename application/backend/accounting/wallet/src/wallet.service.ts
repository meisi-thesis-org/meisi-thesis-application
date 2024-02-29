import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { walletMapper, type WalletDTO, type WalletEntity } from './structs/wallet.domain';
import { type UpdateWalletByUuidRequest, type CreateWalletRequest, type FindWalletByUuidRequest, type FindWalletByUserUuidRequest } from './structs/wallet.request';
import { type WalletRepository } from './wallet.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { WalletStateRepository } from './repositories/wallet-state.repository';
import { BadRequestException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/bad-request.exception';

export class WalletService {
  private readonly repository: WalletRepository = new WalletStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findWalletByUuid (requestArgs: FindWalletByUuidRequest): Promise<WalletDTO> {
    const foundEntity = await this.repository
      .findWalletByUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    return walletMapper(foundEntity)
  }

  public async findWalletByUserUuid (requestArgs: FindWalletByUserUuidRequest): Promise<WalletDTO> {
    const foundEntity = await this.repository
      .findWalletByUserUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    return walletMapper(foundEntity);
  }

  public async createWallet (requestArgs: CreateWalletRequest, requestOptions?: Record<string, string>): Promise<WalletDTO> {
    const foundEntity = await this.repository
      .findWalletByUserUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity !== undefined) throw new ConflictException();

    await this.networkProvider
      .doHttpRequest('8000', `security/users/${requestArgs.userUuid}`, 'GET', { authorization: requestOptions?.authorization ?? '' })
      .catch((error) => { throw error })

    const createdEntity: WalletEntity = {
      uuid: this.randomProvider.randomUUID(),
      userUuid: requestArgs.userUuid,
      funds: 10,
      active: true,
      visible: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.createWallet(createdEntity).catch(() => {
      throw new InternalServerException();
    })

    return walletMapper(createdEntity);
  }

  public async updateWalletByUuid (requestArgs: UpdateWalletByUuidRequest): Promise<WalletDTO> {
    const foundEntity = await this.repository
      .findWalletByUuid({ uuid: requestArgs.uuid })
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    if (requestArgs.funds !== undefined && requestArgs.funds > foundEntity.funds) throw new BadRequestException();
    const newFunds = foundEntity.funds - (requestArgs.funds ?? 0);

    const updatedEntity: WalletEntity = {
      uuid: foundEntity.uuid,
      userUuid: foundEntity.userUuid,
      funds: newFunds,
      active: requestArgs.active ?? foundEntity.active,
      visible: requestArgs.visible ?? foundEntity.visible,
      createdAt: foundEntity.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.updateWalletByUuid(updatedEntity).catch(() => {
      throw new InternalServerException();
    })

    return walletMapper(updatedEntity);
  }
}
