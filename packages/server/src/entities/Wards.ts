import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { DistrictEntity } from "./District";
import { PropertyEntity } from "./Property";
import { DateTime } from "./share/DateTime";

@Entity("wards")
export class WardsEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "Wards code.",
    length: 20,
  })
  code!: string;

  @Column({
    comment: "Wards name.",
    length: 100,
  })
  name!: string;

  /**
   * Relation column
   */
  // Wards n - 1 District
  @ManyToOne(() => DistrictEntity, (district) => district.wards)
  district!: DistrictEntity;

  // Wards 1 - n Property
  @OneToMany(() => PropertyEntity, (property) => property.ward)
  properties!: PropertyEntity[];
}
