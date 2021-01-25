import { EntityRepository } from "typeorm";
import { UserEntity } from "../entities/User";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({ email });
  }
}
