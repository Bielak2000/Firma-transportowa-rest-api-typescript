import {EntityRepository, Repository} from "typeorm";
import {KierowcaEntity} from "../entities/kierowcy.entity";

@EntityRepository(KierowcaEntity)
export class KierowcaRepository extends Repository<KierowcaEntity> {
    //findByAuthorPartialName(author: string): Promise<PojazdEntity[]>{
    //    return this.createQueryBuilder("pojazd")
    //        .getMany();
    //}
}