import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

  import {PojazdEntity} from "./pojazdy.entity";
  import {KierowcaEntity} from "./kierowcy.entity";

  @Entity('trasy')
  export class TrasyEntity{
    @PrimaryGeneratedColumn()
    ID_kursu: number;

    @Column()
    data: Date;

    @Column()
    km: number;

    @Column()
    cena_paliwa: number;

    @ManyToOne(() => PojazdEntity, pojazd => pojazd.trasy)
    @JoinColumn({name: 'ID_pojazdu'})
    pojazd: PojazdEntity;

    @Column({name:"ID_pojazdu"})
    ID_pojazdu: number;

    @ManyToOne(() => KierowcaEntity, kierowca => kierowca.trasy)
    @JoinColumn({name: 'ID_kierowcy'})
    kierowca: KierowcaEntity;

    @Column({name:"ID_kierowcy"})
    ID_kierowcy: number;
  }