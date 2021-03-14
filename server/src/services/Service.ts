interface Service<T> {
  create(entity: T): T;
  getList(): T[];
  findById(id: string): T;
  delete(id: string): void;
}

export default Service;