import express from 'express';
import isAuthenticated from '../../middleware/auth.middleware';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    deleteUser,
    getAllUsers,
    getProfile,
    getUserByid
} from '../../controllers/users.controller';

const userRoutes = express.Router();

userRoutes.get('/', catchErrors(getAllUsers));

userRoutes.get('/:id', catchErrors(getUserByid));

userRoutes.delete('/:id', catchErrors(deleteUser));

userRoutes.get('/profile', isAuthenticated, catchErrors(getProfile));

userRoutes.use(errorHandler);

export { userRoutes };
