import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Users} from "./Users"
import {PermissionsRoles} from "./PermissionsRoles"

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleName!: string;

  @OneToMany(() => Users, user => user.role)
  users!: Users[];

  @OneToMany(() => PermissionsRoles, permissionRoles => permissionRoles.role)
  permissionsRoles!: PermissionsRoles[];
}
