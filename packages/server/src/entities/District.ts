import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { WardsEntity } from "./Wards";
import { ProvinceEntity } from "./Province";
import { DateTime } from "./share/DateTime";

@Entity("district")
export class DistrictEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "District code.",
    length: 20,
  })
  code!: string;

  @Column({
    comment: "District name.",
    length: 100,
  })
  name!: string;

  /**
   * Relation column
   */
  // District n - 1 Province
  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  province!: ProvinceEntity;

  // District 1 - n Wards
  @OneToMany(() => WardsEntity, (ward) => ward.district)
  wards!: WardsEntity[];
}
