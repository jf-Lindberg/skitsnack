import type { NextFunction, Request, Response } from 'express';

export const index = async (req: Request, res: Response, next: NextFunction) => {
    res.send('GET - Hello from index Route!');
};
