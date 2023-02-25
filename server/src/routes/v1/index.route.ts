import express, { type Request, type Response, type NextFunction } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('GET - Hello from index Route!');
});

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
    res.send('GET - Hello from index Route!');
});

export { router as indexRouter };
