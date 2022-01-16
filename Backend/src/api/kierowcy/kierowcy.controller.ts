import {SearchDto} from "./dto/search.dto";
import {NextFunction, Request, Response} from 'express';
import {BadRequestException} from "../../exceptions/bad-request-exception";
import {getKierowcy, getKierowcyById, createKierowca, editKierowca, removeKierowca} from "./kierowcy.service";
import {SortOrder} from "../../consts/sortOrder.enum";
import {KierowcaNotFoundException} from "../../exceptions/kierowca-not-found.exception";
import {CreateKierowcaDto} from "./dto/create-kierowca.dto";
import {EditKierowcaDto} from "./dto/edit-kierowca.dto";


export const list = async (req: Request, res: Response, next: NextFunction) => {

    // const q = req.query as unknown as SearchDto;
    // console.log(q)
    const q: SearchDto = {
        limit: 10,
        offset: 0,
        sortBy: "ID_kierowcy",
        sortOrder: SortOrder.DESC,
        // nr_rejestracyjny: "WW12345"
    };
    console.log(q);
    try {
        const [kierowcy, total] = await getKierowcy(q)
        res.header("X-Kierowcy-Total", String(total));
        return res.json(kierowcy);
    } catch (e) {
        return next(new BadRequestException((<Error>e).message));
    }
};


export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const kierowca = await getKierowcyById(id);
        if (!kierowca) {
            //console.log("sadasdasd");
            return next(new KierowcaNotFoundException());
            //throw new BookNotFoundException();
        }
        res.json(kierowca);
    } catch (err) {
        return next(new BadRequestException());
    }
};


export const add = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as CreateKierowcaDto;

    try {
        const kierowca = await createKierowca(data);
        return res.json(kierowca);
    } catch (err) {
        return next(new BadRequestException());
    }
};


export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const data = req.body as EditKierowcaDto;

    try {
        let kierowca = await getKierowcyById(id);
        if (!kierowca) {
            return next(new KierowcaNotFoundException());
        }

        kierowca= await editKierowca(kierowca, data);
        return res.json(kierowca);
    } catch (err) {
        return next(new BadRequestException());
    }

};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        ///console.log("11111");
        const kierowca = await getKierowcyById(id);
        //console.log("3331");
        if (!kierowca) {
            //console.log("3344431");
            return next(new KierowcaNotFoundException());
        }
        //console.log("2222111");
        await removeKierowca(kierowca);
        //console.log("34444431");
        res.status(204).end();
    } catch (err) {
        return next(new BadRequestException());
    }

};