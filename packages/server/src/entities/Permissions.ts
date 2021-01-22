import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PermissionsRoles } from "./PermissionsRoles";
import { DateTime } from "./share/DateTime";
@Entity()
export class Permissions extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  permissionName!: string;

  @OneToMany(
    () => PermissionsRoles,
    (permissionRoles) => permissionRoles.permission
  )
  permissionsRoles!: PermissionsRoles[];
}
