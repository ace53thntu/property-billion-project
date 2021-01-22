import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {PermissionsRoles} from "./PermissionsRoles"

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  permissionName!: string;

  @OneToMany(() => PermissionsRoles, permissionRoles => permissionRoles.permission)
  permissionsRoles!: PermissionsRoles[];
}
