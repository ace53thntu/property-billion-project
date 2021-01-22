import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Properties } from "./Properties";
import { DateTime } from "./share/DateTime";
@Entity()
export class PropertiesAudiences extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @OneToMany(() => Properties, (property) => property.propertyAudience)
  properties!: Properties[];
}
