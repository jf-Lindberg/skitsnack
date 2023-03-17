import express from 'express';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    deleteUser,
    getAllUsers,
    getProfile,
    getUserByid
} from '../../controllers/users.controller';
import { isAdmin, isAuthenticated } from '../../middleware/auth.middleware';

const userRoutes = express.Router();

userRoutes.get('/', catchErrors(getAllUsers));

userRoutes.get('/:id', catchErrors(getUserByid));

userRoutes.delete('/:id', catchErrors(deleteUser));

// add PUT route
/*userRoutes.put('/:id', catchErrors(updateUser));*/

// basically same as get /:id right now, but with auth
userRoutes.get('/:id/profile', isAuthenticated, isAdmin, catchErrors(getProfile));

userRoutes.use(errorHandler);

export { userRoutes };
