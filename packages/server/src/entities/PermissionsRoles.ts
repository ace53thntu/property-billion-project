import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Permissions} from "./Permissions"
import {Roles} from "./Roles"

@Entity()
export class PermissionsRoles {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Permissions, permission => permission.permissionsRoles)
  permission!: Permissions[];

  @ManyToOne(() => Roles, role => role.permissionsRoles)
  role!: Roles[];
}
