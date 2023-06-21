export abstract class Mapper<T, K> {
  abstract apply(entity: T): K
};
