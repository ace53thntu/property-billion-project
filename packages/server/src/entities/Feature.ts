import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertyFeatureEntity } from "./PropertyFeature";
import { DateTime } from "./share/DateTime";

@Entity("feature")
export class FeatureEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => PropertyFeatureEntity, (ps) => ps.feature)
  propertyFeature!: PropertyFeatureEntity[];
}
