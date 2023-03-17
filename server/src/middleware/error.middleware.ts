import type { Request, Response, NextFunction } from 'express';
import type { AsyncRequestHandler } from '../types/requestHandlers';
import type { ResponseError } from '../errors/ResponseError';

export const catchErrors =
    <T, P>(action: AsyncRequestHandler<T, P>): AsyncRequestHandler<T, P> =>
    (req: Request<P>, res: Response, next: NextFunction) => {
        return Promise.resolve(action(req, res, next)).catch(next);
    };

/**
 * Error handling middleware for the authentication controller
 */
export const errorHandler = (
    err: ResponseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.stack = err.stack || '';
    const status = err.status || 500;
    const error = { message: err.message };
    res.status(status);
    res.json({ status, error });
    // old code
    /*    console.error(err);
    res.status(500).json({ message: 'Internal server error' });*/
};
