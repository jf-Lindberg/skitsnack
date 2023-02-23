import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

export const indexRouter = () => {
    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        res.send('GET - Hello from index Route!');
    });

    router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
        res.send('GET - Hello from index Route!');
    });

    return router;
}
