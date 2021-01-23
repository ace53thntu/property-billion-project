import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Users } from "./Users";
import { PermissionsRoles } from "./PermissionsRoles";
import { DateTime } from "./share/DateTime";

@Entity()
export class Roles extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleName!: string;

  @OneToMany(() => Users, (user) => user.role)
  users!: Users[];

  @OneToMany(() => PermissionsRoles, (permissionRoles) => permissionRoles.role)
  permissionsRoles!: PermissionsRoles[];
}