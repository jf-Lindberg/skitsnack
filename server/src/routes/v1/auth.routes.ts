import express from 'express';
import { check } from 'express-validator';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    login,
    register,
    refreshToken,
    revokeRefreshTokens
} from '../../controllers/auth.controller';

const authRoutes = express.Router();

authRoutes.post(
    '/login',
    [check('email').isEmail(), check('password').isLength({ min: 8 })],
    // validateInputs(login)?
    catchErrors(login)
);

authRoutes.post(
    '/register',
    [check('email').isEmail(), check('password').isLength({ min: 8 })],
    // validateInputs(register)?
    catchErrors(register)
);

authRoutes.post('/refreshToken', catchErrors(refreshToken));

authRoutes.post('/revokeRefreshTokens', catchErrors(revokeRefreshTokens));

authRoutes.use(errorHandler);

export { authRoutes };
