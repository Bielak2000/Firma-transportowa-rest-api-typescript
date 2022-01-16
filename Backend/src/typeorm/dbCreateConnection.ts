import mysql from 'mysql';
import "reflect-metadata";
import {PojazdEntity as Pojazdy} from './entities/pojazdy.entity';
import {KierowcaEntity as Kierowcy} from './entities/kierowcy.entity';
import {TrasyEntity as Trasy} from './entities/trasy.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { createConnection } from "typeorm";

export const dbCreateConnection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Kacper",
    database: "firma_transportowa",
    /*entities: [
        Pojazdy,
        Kierowcy,
        Trasy
    ],*/
    entities: ['src/typeorm/entities/**/*.ts'],
    subscribers: ['src/typeorm/subscribers/**/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
    //typeorm-naming-strategies
    synchronize: false,
    logging: false
});