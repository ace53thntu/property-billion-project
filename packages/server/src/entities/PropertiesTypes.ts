import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Properties } from "./Properties";
import { DateTime } from "./share/DateTime";

@Entity()
export class PropertiesTypes extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Properties, (property) => property.propertyType)
  properties!: Properties[];
}
