import { type NextFunction, type Request, type Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authorization: string | undefined = req.headers.authorization;

    if (authorization === undefined || authorization === '') {
        res.status(401);
        throw new Error('❌ Unauthorized ❌');
    }

    try {
        const token = authorization.split(' ')[1];
        req.body = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    } catch (err: unknown) {
        res.status(401);
        if (err instanceof TokenExpiredError) {
            throw new Error(err.name);
        }
        throw new Error('❌ Unauthorized ❌');
    }

    next();
}
