import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertyServiceEntity } from "./PropertyService";
import { DateTime } from "./share/DateTime";

@Entity("service")
export class ServiceEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => PropertyServiceEntity, (ps) => ps.service)
  propertyService!: PropertyServiceEntity[];
}
