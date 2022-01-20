import {Connection, FindManyOptions, getConnectionManager, getCustomRepository, Like} from "typeorm";
import {PojazdEntity} from "../../typeorm/entities/pojazdy.entity";
import {PojazdRepository} from "../../typeorm/repositories/pojazdy.repository";
import {SearchDto} from "./dto/search.dto";
import { createConnection } from "typeorm";
import { dbCreateConnection } from "../../typeorm/dbCreateConnection";
import {CreatePojazdDto} from "./dto/create-pojazd.dto";
import {EditPojazdDto} from "./dto/edit-pojazd.dto";
import { BadRequestException } from "../../exceptions/bad-request-exception";


export const getPojazdy = async (data: SearchDto) : Promise<[PojazdEntity[], number]> => {
    const {offset = 0, limit = undefined, sortBy, sortOrder} = data;
    console.log(data);
    const opts: FindManyOptions = {
        skip: offset,
        take: limit,
        // where: nr_rejestracyjny ? {nr_rejestracyjny: Like(`%${nr_rejestracyjny}%`)} : undefined,
        order: {
            [sortBy]: sortOrder,
        },
        // relations: ['trasy']
    }
    
    console.log(opts);
    const connection = await dbCreateConnection;
    const pojazdRepository = connection.getCustomRepository(PojazdRepository);
    
    const pojazdyPromise = pojazdRepository.find(opts);
    const countPromise = pojazdRepository.count(opts);
    console.log(await pojazdyPromise); console.log(await countPromise);
    
    return await Promise.all([pojazdyPromise, countPromise]);
}

export const getPojazdyById = async (id: number): Promise<PojazdEntity | undefined> => {
    const connection = await dbCreateConnection;
    const pojazdRepository = connection.getCustomRepository(PojazdRepository);
    return await pojazdRepository.findOne(id);
}

export const createPojazd = async ( data: CreatePojazdDto): Promise<PojazdEntity> => {
    const { nr_rejestracyjny, spalanie, stawka } = data;

    if(nr_rejestracyjny==null){
        throw new BadRequestException();
    }

    const connection = await dbCreateConnection;
    const pojazdRepository = connection.getCustomRepository(PojazdRepository);

    const pojazd = new PojazdEntity();
    pojazd.nr_rejestracyjny = nr_rejestracyjny;
    pojazd.spalanie = spalanie;
    pojazd.stawka = stawka;
    return await pojazdRepository.save(pojazd);
}

export const editPojazd = async(pojazd: PojazdEntity, data: EditPojazdDto): Promise<PojazdEntity> => {
   // const author = await getAuthorById(data.authorId);
    //if(!author) throw new AuthorNotFoundException();

    const connection = await dbCreateConnection;
    const pojazdRepository = connection.getCustomRepository(PojazdRepository);
    pojazd.stawka = data.stawka

    return pojazdRepository.save(pojazd);
}

export const removePojazd = async(pojazd: PojazdEntity): Promise<PojazdEntity> => {
    const connection = await dbCreateConnection;
    const pojazdRepository = connection.getCustomRepository(PojazdRepository);
    //await pojazdRepository.remove(pojazd);
    return pojazdRepository.remove(pojazd);
}