import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertiesFeatures } from "./PropertiesFeatures";
import { DateTime } from "./share/DateTime";

@Entity()
export class Features extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => PropertiesFeatures, (ps) => ps.feature)
  propertiesServices!: PropertiesFeatures[];
}
