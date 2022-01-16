import {EntityRepository, Repository} from "typeorm";
import {PojazdEntity} from "../entities/pojazdy.entity";

@EntityRepository(PojazdEntity)
export class PojazdRepository extends Repository<PojazdEntity> {
    //findByAuthorPartialName(author: string): Promise<PojazdEntity[]>{
    //    return this.createQueryBuilder("pojazd")
    //        .getMany();
    //}
}