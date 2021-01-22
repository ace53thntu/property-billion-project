import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Wards } from "./Wards";
import { Provinces } from "./Provinces";
import { DateTime } from "./share/DateTime";

@Entity()
export class Districts extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Provinces, (province) => province.districts)
  province!: Provinces;

  @OneToMany(() => Wards, (ward) => ward.district)
  wards!: Wards[];
}
