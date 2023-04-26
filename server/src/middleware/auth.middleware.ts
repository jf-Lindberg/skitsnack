import { type NextFunction, type Request, type Response } from 'express';
import { type AuthenticatedUser } from '../types/authenticatedUser';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import prisma from '../utils/prisma';

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authorization: string | undefined = req.headers.authorization;

    if (authorization === undefined || authorization === '') {
        res.status(401);
        throw new Error('Unauthorized');
    }

    try {
        const token = authorization.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as AuthenticatedUser;
    } catch (err: unknown) {
        res.status(401);
        if (err instanceof TokenExpiredError) {
            throw new Error(err.name);
        }
        throw new Error('Unauthorized');
    }

    next();
}

export function isOwner(req: Request, res: Response, next: NextFunction): void {
    const user = req.user as AuthenticatedUser;
    const id = user.userId;

    console.log('ID FROM isOwner: ', id);
    // not sure if check should be for owner AND admin or if they should be separated
    // maybe separate admin routes? although it feels unnecessary

    next();
}

export async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const reqUser = req.user as AuthenticatedUser;
    const id = reqUser.userId;
    const user = await prisma.user.findUnique({ where: { id } });
    if (user?.userType === 'ADMIN') {
        return next('route');
    }
    next();
}
