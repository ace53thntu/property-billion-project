import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertyEntity } from "./Property";
import { DateTime } from "./share/DateTime";

@Entity("property_type")
export class PropertyTypeEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => PropertyEntity, (property) => property.propertyType)
  property!: PropertyEntity[];
}
