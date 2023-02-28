import type { Request, Response, NextFunction } from 'express';
import type { AsyncRequestHandler } from '../types/requestHandlers';

export const catchErrors =
    <T, P>(action: AsyncRequestHandler<T, P>): AsyncRequestHandler<T, P> =>
    (req: Request<P>, res: Response, next: NextFunction) => {
        return Promise.resolve(action(req, res, next)).catch(next);
    };

/**
 * Error handling middleware for the authentication controller
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
};
