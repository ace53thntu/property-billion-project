import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PropertyEntity } from "./Property";
import { DateTime } from "./share/DateTime";

@Entity("file")
export class FileEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  extension!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  size!: number;

  @Column({ nullable: true })
  dimension!: string;

  @Column()
  permissionId!: number;

  @ManyToOne(() => PropertyEntity, (property) => property.files)
  property!: PropertyEntity;
}
