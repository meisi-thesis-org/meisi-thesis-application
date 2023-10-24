import { type WalletEntity } from './wallet.domain';

type FindWalletByUuidRequest = NonNullable<Readonly<Pick<WalletEntity, 'uuid'>>>;
type FindWalletByUserUuidRequest = NonNullable<Readonly<Pick<WalletEntity, 'userUuid'>>>;
type CreateWalletRequest = NonNullable<Readonly<Pick<WalletEntity, 'userUuid'>>>;
type UpdateWalletByUuidRequest =
    NonNullable<Readonly<Pick<WalletEntity, 'uuid'>>> &
    Partial<Readonly<Pick<WalletEntity, 'funds' | 'active' | 'enabled'>>>;

export type { FindWalletByUuidRequest, FindWalletByUserUuidRequest, CreateWalletRequest, UpdateWalletByUuidRequest }
