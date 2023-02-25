import express, { type Request, type Response, type NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import hashToken from '../../utils/hash-token';
import { generateTokens } from '../../utils/jwt';
import {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
} from '../../services/auth.services';
import { usersServices } from '../../services/users.services';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await usersServices.findUserByEmail(email);

        if (existingUser == null) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const jtId = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jtId);
        await addRefreshTokenToWhitelist(jtId, refreshToken, existingUser.id);

        res.json({
            accessToken,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    // ADD EMAIL & PW VALIDATION
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await usersServices.findUserByEmail(email);

        if (existingUser != null) {
            res.status(400);
            throw new Error('Email already in use.');
        }

        const user = await usersServices.createUserByEmailAndPassword({ email, password });
        const jtId = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jtId);
        await addRefreshTokenToWhitelist(jtId, refreshToken, user.id);

        res.json({
            accessToken,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
});

router.post('/refreshToken', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
        ) as JwtPayload;
        const savedRefreshToken = await findRefreshTokenById(payload.jti as string);

        if (savedRefreshToken == null || savedRefreshToken.revoked) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await usersServices.findUserById(payload.userId as string);
        if (user == null) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist(jti, refreshToken, user.id);

        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        next(err);
    }
});

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
router.post('/revokeRefreshTokens', async (req, res, next) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
        next(err);
    }
});

export { router as authRouter };
