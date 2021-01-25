import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProvinceEntity } from "./Province";
import { DateTime } from "./share/DateTime";

@Entity("country")
export class CountryEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "Country name.",
    length: 100,
    unique: true,
  })
  name!: string;

  @Column({
    comment: "Country code.",
    length: 10,
    unique: true,
  })
  code!: string;

  /**
   * Relation column
   */
  // Country 1 - n Province
  @OneToMany(() => ProvinceEntity, (province) => province.country)
  provinces!: ProvinceEntity[];
}
