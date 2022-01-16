import {SearchDto} from "./dto/search.dto";
import {NextFunction, Request, Response} from 'express';
import {BadRequestException} from "../../exceptions/bad-request-exception";
import {getTrasy, getTrasyById, createTrasa, editTrasa, removeTrasa} from "./trasy.service";
import {SortOrder} from "../../consts/sortOrder.enum";
import {KierowcaNotFoundException} from "../../exceptions/kierowca-not-found.exception";
import {PojazdNotFoundException} from "../../exceptions/pojazd-not-found.exception";
import {TrasaNotFoundException} from "../../exceptions/trasa-not-found.exception";
import {CreateTrasaDto} from "./dto/create-trasa.dto";
import {EditTrasaDto} from "./dto/edit-trasa.dto";
import { getPojazdyById } from "../../api/pojazdy/pojazdy.service";
import { getKierowcyById } from "../../api/kierowcy/kierowcy.service";


export const list = async (req: Request, res: Response, next: NextFunction) => {

    // const q = req.query as unknown as SearchDto;
    // console.log(q)
    const q: SearchDto = {
        limit: 50,
        offset: 0,
        sortBy: "ID_kursu",
        sortOrder: SortOrder.DESC,
        // nr_rejestracyjny: "WW12345"
    };
    console.log(q);
    try {
        const [trasy, total] = await getTrasy(q)
        res.header("X-Trasy-Total", String(total));
        return res.json(trasy);
    } catch (e) {
        return next(new BadRequestException((<Error>e).message));
    }
};


export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const trasa = await getTrasyById(id);
        if (!trasa) {
            //console.log("sadasdasd");
            return next(new TrasaNotFoundException());
            //throw new BookNotFoundException();
        }
        res.json(trasa);
    } catch (err) {
        return next(new BadRequestException());
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as CreateTrasaDto;

    try {
        
        const pojazd = await getPojazdyById(data.ID_pojazdu);
        const kierowca = await getKierowcyById(data.ID_kierowcy);
        if (!pojazd) {
            return next(new PojazdNotFoundException());
        }
        if (!kierowca) {
            return next(new KierowcaNotFoundException());
        }
        
        const trasa = await createTrasa(data);
        return res.json(trasa);
    } catch (err) {
        return next(new BadRequestException());
    }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const data = req.body as EditTrasaDto;

    try {
        let trasa = await getTrasyById(id);
        if (!trasa) {
            return next(new TrasaNotFoundException());
        }

        trasa = await editTrasa(trasa, data);
        return res.json(trasa);
    } catch (err) {
        return next(new BadRequestException());
    }

};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        //console.log("11111");
        const trasa = await getTrasyById(id);
        //console.log("3331");
        if (!trasa) {
            //console.log("3344431");
            return next(new TrasaNotFoundException());
        }
        //console.log("2222111");
        const zmienna = await removeTrasa(trasa);
        //console.log("34444431");
        if(zmienna)
            res.status(204).end();
        else
            res.status(400).end();
    } catch (err) {
        console.log(err);
        return next(new BadRequestException());
    }
};