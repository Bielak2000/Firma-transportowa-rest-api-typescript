import {Connection, FindManyOptions, getConnectionManager, getCustomRepository, Like} from "typeorm";
import {KierowcaEntity} from "../../typeorm/entities/kierowcy.entity";
import {KierowcaRepository} from "../../typeorm/repositories/kierowcy.repository";
import {SearchDto} from "./dto/search.dto";
import { dbCreateConnection } from "../../typeorm/dbCreateConnection";
import {CreateKierowcaDto} from "./dto/create-kierowca.dto";
import {EditKierowcaDto} from "./dto/edit-kierowca.dto";


export const getKierowcy = async (data: SearchDto) : Promise<[KierowcaEntity[], number]> => {
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
    const kierowcaRepository = connection.getCustomRepository(KierowcaRepository);
    
    const kierowcyPromise = kierowcaRepository.find(opts);
    const countPromise = kierowcaRepository.count(opts);
    console.log(await kierowcyPromise); console.log(await countPromise);
    
    return await Promise.all([kierowcyPromise, countPromise]);
}


export const getKierowcyById = async (id: number): Promise<KierowcaEntity | undefined> => {
    const connection = await dbCreateConnection;
    const kierowcaRepository = connection.getCustomRepository(KierowcaRepository);
    return await kierowcaRepository.findOne(id);
}


export const createKierowca = async (data: CreateKierowcaDto): Promise<KierowcaEntity> => {
    const { pesel, stawka, nr_telefonu, imie, nazwisko} = data;

    const connection = await dbCreateConnection;
    const kierowcaRepository = connection.getCustomRepository(KierowcaRepository);

    const kierowca = new KierowcaEntity();
    kierowca.pesel = pesel;
    kierowca.nr_telefonu = nr_telefonu;
    kierowca.stawka = stawka;
    kierowca.imie = imie;
    kierowca.nazwisko = nazwisko;
    return await kierowcaRepository.save(kierowca);
}

export const editKierowca = async(kierowca: KierowcaEntity, data: EditKierowcaDto): Promise<KierowcaEntity> => {
   // const author = await getAuthorById(data.authorId);
    //if(!author) throw new AuthorNotFoundException();

    const connection = await dbCreateConnection;
    const kierowcaRepository = connection.getCustomRepository(KierowcaRepository);
    kierowca.stawka = data.stawka;
    kierowca.nr_telefonu=data.nr_telefonu;

    return kierowcaRepository.save(kierowca);
}

export const removeKierowca = async(kierowca: KierowcaEntity): Promise<KierowcaEntity> => {
    const connection = await dbCreateConnection;
    const kierowcaRepository = connection.getCustomRepository(KierowcaRepository);
    //await kierowcaRepository.remove(kierowca);
    return kierowcaRepository.remove(kierowca);
}