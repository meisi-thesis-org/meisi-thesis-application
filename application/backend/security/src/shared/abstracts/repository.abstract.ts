import { type UUID } from 'crypto';

export abstract class Repository<T> {
  abstract findByUuid(uuid: UUID): T
}
