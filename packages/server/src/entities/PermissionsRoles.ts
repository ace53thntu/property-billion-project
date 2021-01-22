import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";
import { DateTime } from "./share/DateTime";

@Entity()
export class PermissionsRoles extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Permissions, (permission) => permission.permissionsRoles)
  permission!: Permissions[];

  @ManyToOne(() => Roles, (role) => role.permissionsRoles)
  role!: Roles[];
}
