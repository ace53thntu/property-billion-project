import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserEntity } from "./User";
import { PermissionRoleEntity } from "./PermissionRole";
import { DateTime } from "./share/DateTime";

@Entity("role")
export class RoleEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users!: UserEntity[];

  @OneToMany(
    () => PermissionRoleEntity,
    (permissionRole) => permissionRole.role
  )
  permissionRole!: PermissionRoleEntity[];
}
