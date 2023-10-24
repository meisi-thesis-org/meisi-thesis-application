import { type WalletEntity } from './structs/wallet.domain';

export interface WalletRepository {
  findWalletByUuid(
    entity: NonNullable<Pick<WalletEntity, 'uuid'>>
  ): Promise<WalletEntity | undefined>
  findWalletByUserUuid(
    entity: Partial<Pick<WalletEntity, 'userUuid'>>
  ): Promise<WalletEntity | undefined>
  createWallet(
    entity: WalletEntity
  ): Promise<void>
  updateWalletByUuid(
    entity: WalletEntity
  ): Promise<void>
}
