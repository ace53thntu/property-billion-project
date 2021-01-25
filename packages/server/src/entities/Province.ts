import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { DistrictEntity } from "./District";
import { CountryEntity } from "./Country";
import { DateTime } from "./share/DateTime";

@Entity("province")
export class ProvinceEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "Province code.",
    length: 20,
  })
  code!: string;

  @Column({
    comment: "Province postal code.",
    length: 20,
    unique: true,
  })
  postalCode!: string;

  @Column({
    comment: "Province name.",
    length: 100,
    unique: true,
  })
  name!: string;

  /**
   * Relation column
   */
  // Province n - 1 Country
  @ManyToOne(() => CountryEntity, (country) => country.provinces)
  country!: CountryEntity;

  // Province 1 - n District
  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts!: DistrictEntity[];
}
