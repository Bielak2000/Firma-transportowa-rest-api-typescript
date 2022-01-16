import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
import { TrasyEntity } from './trasy.entity';

  @Entity('pojazdy')
  export class PojazdEntity{
    @PrimaryGeneratedColumn()
    ID_pojazdu: number;

    @Column()
    nr_rejestracyjny: string;

    @Column()
    spalanie: number;

    @Column()
    stawka: number;

    @OneToMany( type => TrasyEntity, trasa=>trasa.pojazd, { onDelete: "CASCADE"})
    trasy: TrasyEntity[];
    // @OneToMany(() => TrasyEntity, trasa=>trasa.id_pojazdu)
    // trasy: TrasyEntity[];
  }