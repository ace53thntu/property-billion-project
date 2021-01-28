import { EntityRepository } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";
import { SessionEntity } from "../entities/Session";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(SessionEntity)
export class SessionRepository extends BaseRepository<SessionEntity> {
  findByUserId(userId: EntityId): Promise<SessionEntity | undefined> {
    return this.repository
      .createQueryBuilder("session")
      .where("session.userId = :userId", { userId })
      .getOne();
  }

  updateByUserId(userId: EntityId, data: any): Promise<SessionEntity> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where("userId = :userId", { userId })
      .returning("*")
      .execute()
      .then((res) => res.raw[0]);
  }
}
