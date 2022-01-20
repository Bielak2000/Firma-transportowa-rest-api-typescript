import {app} from "../../../index";
import request from "supertest";
import {dbCreateConnection} from "../../../typeorm/dbCreateConnection";
import {Connection} from "typeorm";



describe('API integrations tests', () => {
    let connection: Connection | null;
    let x: number; 

    beforeAll(async () => {
        const connection = await dbCreateConnection;
        const pojazd = {nr_rejestracyjny: "CCCCCC", stawka: 2, spalanie: 17};
            const res = await request(app)
                .post('/api/v1/pojazdy')
                .send(pojazd);
         x=res.body.ID_pojazdu;
    });

    afterAll(() => {
        connection?.close();
    })

    describe('GET /api/v1/pojazdy', () => {
        it('Should get pojazdy lists', async () => {
            const connection = await dbCreateConnection;
            const res = await request(app)
                .get('/api/v1/pojazdy');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    describe(`GET /api/v1/pojazdy/id`, () => {
        it('Should add new pojazd', async () => {
            const pojazd = {nr_rejestracyjny: "CCCCCC", stawka: 2, spalanie: 17};
            const res = await request(app)
                .get(`/api/v1/pojazdy/${x}`);

                expect(res.statusCode).toEqual(200);
        });
        
        it('Shouldnt now allow to add pojazd without NR_rej', async () => {
            const pojazd = {stawka: 2, spalanie: 17};
            const res = await request(app)
                .post('/api/v1/pojazdy')
                .send(pojazd)

            expect(res.statusCode).toEqual(400);
        });
    });

    describe(`PUT /api/v1/pojazdy/id`, () => {
        it('Should edit new pojazd', async () => {
            const pojazd = {stawka: 777};
            const res = await request(app)
                .put(`/api/v1/pojazdy/${x}`)
                .send(pojazd)

            expect(res.statusCode).toEqual(200);
            expect(res.body).toMatchObject(pojazd);
        });
    });

    describe('DELETE /api/v1/pojazdy/id', () => {
        it('Should delete new pojazd', async () => {
            const res = await request(app)
                .delete(`/api/v1/pojazdy/${x}`)

            expect(res.statusCode).toEqual(204);
        });
    });
});

