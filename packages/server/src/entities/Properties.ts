import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import {Wards} from "./Wards"
import {Users} from "./Users"
import {Files} from "./Files"
import {PropertiesAudiences} from "./PropertiesAudiences"
import {PropertiesTypes} from "./PropertiesTypes"
import {PropertiesServices} from "./PropertiesServices"
import {PropertiesFeatures} from "./PropertiesFeatures"

enum Status {
  DONE = 'done',
  AVAILABLE = 'available',
  WAITING = 'waiting'
}

@Entity()
export class Properties {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({nullable: true})
  description!: string;

  @Column({nullable: true})
  area!: number;

  @Column()
  price!: number;

  @Column()
  gender!: Status;

  @Column({ type: "decimal", nullable: true})
  feeElectric!: number;

  @Column({ type: "decimal", nullable: true})
  feeWater!: number;

  @Column({ type: "decimal", nullable: true})
  feeOther!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createAt!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt!: string;

  @Column({ type: 'timestamp', nullable: true})
  expiredAt!: string;

  @Column()
  address!: string;

  @Column({nullable: true})
  long!: string;

  @Column({nullable: true})
  lat!: string;

  @Column({nullable: true})
  slug!: string;

  @OneToMany(() => Files, file => file.property)
  files!: Files[];

  @OneToMany(() => PropertiesServices, ps => ps.property)
  propertiesServices!: PropertiesServices[];

  @OneToMany(() => PropertiesFeatures, ps => ps.property)
  PropertiesFeatures!: PropertiesFeatures[];

  @ManyToOne(() => Wards, ward => ward.properties)
  ward!: Wards;

  @ManyToOne(() => Users, user => user.properties)
  user!: Users;

  @ManyToOne(() => PropertiesAudiences, propertyAudience => propertyAudience.properties)
  propertyAudience!: PropertiesAudiences;

  @ManyToOne(() => PropertiesTypes, propertyType => propertyType.properties)
  propertyType!: PropertiesTypes;

}
