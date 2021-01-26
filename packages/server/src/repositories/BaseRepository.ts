import { AbstractRepository, DeleteResult } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";
import { IBaseRepository } from "../interfaces/IBaseRepository";

export class BaseRepository<T>
  extends AbstractRepository<T>
  implements IBaseRepository<T> {
  find(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T | undefined> {
    return this.repository.findOne(id);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  async insert(data: any): Promise<T> {
    return this.repository
      .createQueryBuilder()
      .insert()
      .values(data)
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  update(id: EntityId, data: any): Promise<T> {
    return this.repository.update(id, data).then((result) => result.raw[0]);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
