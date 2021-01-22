import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import {Properties} from "./Properties"

@Entity()
export class Files {
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

  @Column({ nullable: true})
  size!: number;

  @Column({ nullable: true})
  demension!: string;

  @Column()
  permissionId!: number;

  @ManyToOne(() => Properties, property => property.files)
  property!: Properties;
}
