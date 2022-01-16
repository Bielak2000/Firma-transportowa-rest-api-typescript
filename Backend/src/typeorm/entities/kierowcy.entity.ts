import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
import { TrasyEntity } from './trasy.entity';

  @Entity('kierowcy')
  export class KierowcaEntity{
    @PrimaryGeneratedColumn()
    ID_kierowcy: number;

    @Column()
    imie: string;

    @Column()
    nazwisko: string;

    @Column()
    pesel: string;

    @Column()
    stawka: number;

    @Column()
    nr_telefonu: string;

    @OneToMany(type => TrasyEntity, trasa=>trasa.kierowca, { onDelete: "CASCADE"})
    trasy: TrasyEntity[];
  }