interface Repository<T> {
  create(entity: T): T;
  getList(): Readonly<T[]>;
  findById(id: string): T;
  delete(id: string): void;
}

export default Repository;