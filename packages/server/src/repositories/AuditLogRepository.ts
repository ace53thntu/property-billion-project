import { EntityRepository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { AuditLogEntity } from "../entities/AuditLog";

@EntityRepository(AuditLogEntity)
export class AuditLogRepository extends BaseRepository<AuditLogEntity> {}
