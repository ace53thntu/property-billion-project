import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PermissionEntity } from "./Permission";
import { RoleEntity } from "./Role";
import { DateTime } from "./share/DateTime";

@Entity("permission_role")
export class PermissionRoleEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PermissionEntity, (permission) => permission.permissionRole)
  permission!: PermissionEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.permissionRole)
  role!: RoleEntity[];
}
