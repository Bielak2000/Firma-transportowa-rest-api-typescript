import {Connection, FindManyOptions, getConnectionManager, getCustomRepository, Like} from "typeorm";
import {TrasyEntity} from "../../typeorm/entities/trasy.entity";
import {TrasaRepository} from "../../typeorm/repositories/trasy.repository";
import {SearchDto} from "./dto/search.dto";
import {dbCreateConnection } from "../../typeorm/dbCreateConnection";
import {CreateTrasaDto} from "./dto/create-trasa.dto";
import {EditTrasaDto} from "./dto/edit-trasa.dto";


export const getTrasy = async (data: SearchDto) : Promise<[TrasyEntity[], number]> => {
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
    const trasaRepository = connection.getCustomRepository(TrasaRepository);
    
    const trasyPromise = trasaRepository.find(opts);
    const countPromise = trasaRepository.count(opts);
    console.log(await trasyPromise); console.log(await countPromise);
    
    return await Promise.all([trasyPromise, countPromise]);
}

export const getTrasyById = async (id: number): Promise<TrasyEntity | undefined> => {
    const connection = await dbCreateConnection;
    const trasaRepository = connection.getCustomRepository(TrasaRepository);
    return await trasaRepository.findOne(id);
}

export const createTrasa = async (data1: CreateTrasaDto): Promise<TrasyEntity> => {
    const { data, km, cena_paliwa, ID_pojazdu, ID_kierowcy } = data1;

    const connection = await dbCreateConnection;
    const pojazdRepository = connection.getCustomRepository(TrasaRepository);

    const trasa = new TrasyEntity();
    trasa.ID_pojazdu = ID_pojazdu;
    trasa.ID_kierowcy = ID_kierowcy;
    trasa.cena_paliwa = cena_paliwa;
    trasa.km = km;
    trasa.data = data;
    return await pojazdRepository.save(trasa);
}

export const editTrasa = async(trasa: TrasyEntity, data: EditTrasaDto): Promise<TrasyEntity> => {
   // const author = await getAuthorById(data.authorId);
    //if(!author) throw new AuthorNotFoundException();

    const connection = await dbCreateConnection;
    const trasaRepository = connection.getCustomRepository(TrasaRepository);
    trasa.cena_paliwa = data.cena_paliwa;
    trasa.km = data.km;

    return trasaRepository.save(trasa);
}

export const removeTrasa = async(trasa: TrasyEntity): Promise<TrasyEntity> => {
    const connection = await dbCreateConnection;
    const trasaRepository = connection.getCustomRepository(TrasaRepository);
    //await pojazdRepository.remove(pojazd);
    return trasaRepository.remove(trasa);
}