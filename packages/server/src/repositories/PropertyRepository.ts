import { EntityRepository } from "typeorm";
import { PropertyEntity } from "../entities/Property";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(PropertyEntity)
export class PropertyRepository extends BaseRepository<PropertyEntity> {}
