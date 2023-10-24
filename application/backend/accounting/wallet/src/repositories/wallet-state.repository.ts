import { type WalletEntity } from '../structs/wallet.domain';
import { type WalletRepository } from '../wallet.repository';

export class WalletStateRepository implements WalletRepository {
  private readonly wallets = new Array<WalletEntity>();

  public async findWalletByUuid (entity: Pick<WalletEntity, 'uuid'>): Promise<WalletEntity | undefined> {
    return this.wallets.find((wallet) => wallet.uuid === entity.uuid);
  }

  public async findWalletByUserUuid (entity: Partial<Pick<WalletEntity, 'userUuid'>>): Promise<WalletEntity | undefined> {
    return this.wallets.find((wallet) => wallet.userUuid === entity.userUuid);
  }

  public async createWallet (entity: WalletEntity): Promise<void> {
    this.wallets.push(entity);
  }

  public async updateWalletByUuid (entity: WalletEntity): Promise<void> {
    this.wallets.filter((wallet) => {
      if (wallet.uuid === entity.uuid) {
        wallet = { ...wallet, ...entity };
      }

      return wallet;
    })
  }
}
