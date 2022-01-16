import jwt from "jsonwebtoken"


// w payload mozesz dac dowolne dane, np. rolę w systemie - podspianie tokena i generacja
export const sign = (id: number) =>
    jwt.sign({ sub: id}, process.env.JWT_PASSWORD as string, { expiresIn: '1 hour' })      // lub w sekundach

// Weryfikacja poprawnosci i waznosci JWT - weryfikacja tokena
export const verifyJwt = (token: string) =>
    jwt.verify(token, process.env.JWT_PASSWORD as string);