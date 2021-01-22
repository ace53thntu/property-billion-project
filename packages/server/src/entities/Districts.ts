import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import {Wards} from "./Wards"
import {Provinces} from "./Provinces"

@Entity()
export class Districts {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Provinces, province => province.districts)
  province!: Provinces;

  @OneToMany(() => Wards, ward => ward.district)
  wards!: Wards[];
}
