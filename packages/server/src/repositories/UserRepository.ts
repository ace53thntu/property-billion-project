import { EntityRepository } from "typeorm";
import argon2 from "argon2";
import { UserEntity } from "../entities/User";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({ email });
  }

  findByEmailAndSelectPassword(email: string): Promise<UserEntity | undefined> {
    return this.repository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email.toLowerCase() })
      .addSelect("user.password")
      .getOne();
  }

  async findByCredentials(
    email: string,
    password: string
  ): Promise<UserEntity | undefined> {
    const user = await this.findByEmailAndSelectPassword(email);

    if (!user) {
      return undefined;
    }

    const valid = await argon2.verify(user?.password, password);
    if (valid) {
      return user;
    } else {
      return undefined;
    }
  }
}
