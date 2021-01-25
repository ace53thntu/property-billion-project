import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PermissionRoleEntity } from "./PermissionRole";
import { DateTime } from "./share/DateTime";
@Entity("permission")
export class PermissionEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(
    () => PermissionRoleEntity,
    (permissionRole) => permissionRole.permission
  )
  permissionRole!: PermissionRoleEntity[];
}
