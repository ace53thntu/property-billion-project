import { EntityRepository } from "typeorm";
import { RoleEntity } from "../entities/Role";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity> {}
