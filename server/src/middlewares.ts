import {NextFunction, Request, Response} from 'express';
import jwt, {TokenExpiredError} from "jsonwebtoken";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        req.body = jwt.verify(token, <string>process.env.JWT_ACCESS_SECRET);
    } catch (err: unknown) {
        res.status(401);
        if (err instanceof TokenExpiredError) {
            throw new Error(err.name);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }

    return next();
}
