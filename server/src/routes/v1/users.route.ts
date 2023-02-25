import express, { type Request, type Response, type NextFunction } from 'express';
import { usersServices } from '../../services/users.services';
import isAuthenticated from '../../middleware/auth-middleware';
import { type User } from '../../types/models/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await usersServices.findAllUsers();
        if (users === null) return res.sendStatus(404);
        return res.status(200).send(users);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await usersServices.findUserById(id);
        if (user === null) return res.sendStatus(404);
        return res.status(200).send(user);
    } catch {
        return res.sendStatus(500);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    // check that user is same as ID or Admin
    try {
        const { id } = req.params;
        const user = await usersServices.deleteUserById(id);
        if (user === null) return res.sendStatus(404);
        return res.sendStatus(204);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.body;
        const user = (await usersServices.findUserById(userId)) as Partial<User>;
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
});

export { router as userRouter };
