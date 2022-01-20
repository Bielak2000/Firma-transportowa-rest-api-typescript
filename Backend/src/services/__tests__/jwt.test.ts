import {sign} from "../jwt";
import jwt, {JwtPayload} from "jsonwebtoken"

describe('Jwt tests', () => {
    it('Should create proper token', () => {
        const token = sign(1);

        const decoded = jwt.decode(token) as JwtPayload;
        expect(decoded).toHaveProperty("sub");

        const maxExp = new Date().getTime() / 1000 + 3599;
        expect(decoded.exp).toBeLessThan(maxExp);
    });
})