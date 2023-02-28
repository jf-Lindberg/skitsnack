import express from 'express';
import { index } from '../../controllers/index.controller';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';

const indexRoutes = express.Router();

indexRoutes.get('/', catchErrors(index));

indexRoutes.use(errorHandler);

export { indexRoutes };
