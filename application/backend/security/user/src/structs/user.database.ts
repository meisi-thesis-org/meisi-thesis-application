import { type Updateable, type Insertable, type Selectable } from 'kysely';
import { type UserEntity } from './user.domain';

type UserTable = UserEntity
type UserDatabase = { user: UserTable }

type FindUserAction = Selectable<UserTable>
type CreateUserAction = Insertable<UserTable>
type UpdateUserAction = Updateable<UserTable>

export type { UserTable, UserDatabase, FindUserAction, CreateUserAction, UpdateUserAction }
