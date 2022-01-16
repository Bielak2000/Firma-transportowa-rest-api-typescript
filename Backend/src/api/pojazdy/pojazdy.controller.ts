import {SearchDto} from "./dto/search.dto";
import {NextFunction, Request, Response} from 'express';
import {BadRequestException} from "../../exceptions/bad-request-exception";
import {getPojazdy, getPojazdyById, createPojazd, editPojazd, removePojazd} from "./pojazdy.service";
import {SortOrder} from "../../consts/sortOrder.enum";
import {PojazdNotFoundException} from "../../exceptions/pojazd-not-found.exception";
import {CreatePojazdDto} from "./dto/create-pojazd.dto";
import {EditPojazdDto} from "./dto/edit-pojazd.dto";


export const list = async (req: Request, res: Response, next: NextFunction) => {

    // const q = req.query as unknown as SearchDto;
    // console.log(q)
    const q: SearchDto = {
        limit: 10,
        offset: 0,
        sortBy: "ID_pojazdu",
        sortOrder: SortOrder.DESC,
        // nr_rejestracyjny: "WW12345"
    };
    console.log(q);
    try {
        const [pojazdy, total] = await getPojazdy(q)
        res.header("X-Books-Total", String(total));
        return res.json(pojazdy);
    } catch (e) {
        return next(new BadRequestException((<Error>e).message));
    }
};


export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const pojazd = await getPojazdyById(id);
        if (!pojazd) {
            //console.log("sadasdasd");
            return next(new PojazdNotFoundException());
            //throw new BookNotFoundException();
        }
        res.json(pojazd);
    } catch (err) {
        return next(new BadRequestException());
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as CreatePojazdDto;

    try {
        const pojazd = await createPojazd(data);
        return res.json(pojazd);
    } catch (err) {
        return next(new BadRequestException());
    }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const data = req.body as EditPojazdDto;

    try {
        let pojazd = await getPojazdyById(id);
        if (!pojazd) {
            return next(new PojazdNotFoundException());
        }

        pojazd = await editPojazd(pojazd, data);
        return res.json(pojazd);
    } catch (err) {
        return next(new BadRequestException());
    }

};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        //console.log("11111");
        const pojazd = await getPojazdyById(id);
        //console.log("3331");
        if (!pojazd) {
            //console.log("3344431");
            return next(new PojazdNotFoundException());
        }
        //console.log("2222111");
        const zmienna = await removePojazd(pojazd);
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