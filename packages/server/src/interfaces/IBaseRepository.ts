import { DeleteResult } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";

export interface IBaseRepository<T> {
  find(): Promise<T[]>;

  findById(id: EntityId): Promise<T | undefined>;

  findByIds(ids: [EntityId]): Promise<T[]>;

  insert(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
