import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateTime } from "./share/DateTime";

enum Method {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
}

interface IPayload {
  [s: string]: any;
}

@Entity("audit_log")
export class AuditLogEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: Method,
    default: Method.GET,
  })
  method!: Method;

  @Column({
    nullable: true,
  })
  endpoint!: string;

  @Column({
    nullable: true,
  })
  user!: string;

  @Column({
    type: "json",
    nullable: true,
  })
  payload!: IPayload;

  @Column({
    type: "json",
    nullable: true,
  })
  params!: IPayload;

  @Column({
    type: "json",
    nullable: true,
  })
  result!: IPayload;

  @Column({
    nullable: true,
  })
  statusCode!: number;

  @Column({
    nullable: true,
  })
  responseMessage!: string;

  @Column({
    nullable: true,
  })
  entity!: string;

  @Column({
    default: false,
    nullable: false,
  })
  isError!: boolean;

  @Column({
    nullable: true,
  })
  ipAddress!: string;

  @Column({
    nullable: true,
  })
  action!: string;
}
