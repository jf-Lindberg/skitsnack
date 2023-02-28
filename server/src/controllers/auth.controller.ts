import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import hash from '../utils/hash';
import { generateTokens } from '../utils/jwt';
import {
    createUserByEmailAndPassword,
    findUserByEmail,
    findUserById
} from '../services/users.services';
import {
    addRefreshTokenToWhitelist,
    deleteRefreshToken,
    findRefreshTokenById,
    revokeTokens
} from '../services/auth.services';

/**
 * Route handler for authenticating a user
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser == null) {
        return res.status(401).json({ message: 'Invalid login credentials.' });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid login credentials.' });
    }

    const jtId = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jtId);
    await addRefreshTokenToWhitelist(jtId, refreshToken, existingUser.id);

    res.json({
        accessToken,
        refreshToken
    });
};

/**
 * Route handler for registering a user
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser != null) {
        res.status(400);
        throw new Error('Email already in use.');
    }

    const user = await createUserByEmailAndPassword({
        email,
        password
    });

    const jtId = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jtId);
    await addRefreshTokenToWhitelist(jtId, refreshToken, user.id);

    res.json({
        accessToken,
        refreshToken
    });
};

/**
 * Route handler for refreshing a users token
 */
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { refreshToken } = req.body;
    const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
    ) as JwtPayload;

    const savedRefreshToken = await findRefreshTokenById(payload.jti as string);
    if (savedRefreshToken == null || savedRefreshToken.revoked) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const hashedToken = hash(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await findUserById(payload.userId as string);
    if (user == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await deleteRefreshToken(savedRefreshToken.id);

    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist(jti, newRefreshToken, user.id);

    res.json({
        accessToken,
        refreshToken: newRefreshToken
    });
};

/**
 * Route handler for revoking a users refresh tokens
 */
export const revokeRefreshTokens = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
};
