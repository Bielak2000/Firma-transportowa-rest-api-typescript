import {EntityRepository, Repository} from "typeorm";
import {TrasyEntity} from "../entities/trasy.entity";

@EntityRepository(TrasyEntity)
export class TrasaRepository extends Repository<TrasyEntity> {
    //findByAuthorPartialName(author: string): Promise<PojazdEntity[]>{
    //    return this.createQueryBuilder("pojazd")
    //        .getMany();
    //}
}