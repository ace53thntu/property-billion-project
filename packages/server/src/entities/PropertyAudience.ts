import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertyEntity } from "./Property";
import { DateTime } from "./share/DateTime";

@Entity("property_audience")
export class PropertyAudienceEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @OneToMany(() => PropertyEntity, (property) => property.propertyAudience)
  property!: PropertyEntity[];
}
