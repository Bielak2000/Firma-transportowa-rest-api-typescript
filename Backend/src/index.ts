import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import routes from './routes';
import cors from 'cors';
import {queryParser} from 'express-query-parser';
import {errorHandler, routingNotFoundHandler} from './middleware';
import cookieParser from "cookie-parser";


export const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(
    queryParser({
      parseNull: true,
      parseBoolean: true,
      parseNumber: true
    })
)

app.use('/api', routes);
app.use(errorHandler);
app.use(routingNotFoundHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});