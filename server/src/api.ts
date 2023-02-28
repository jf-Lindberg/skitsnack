import express from 'express';
import { routerVersion1 } from './routes/v1/v1.router';

const api = express.Router();
api.use('/v1', routerVersion1);

export { api };
