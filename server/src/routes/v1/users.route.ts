import express, {Request, Response, NextFunction} from 'express';
import {usersServices} from "../../services/users.services";

const router = express.Router();

export const userRouter = () => {
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
            const {id} = req.params;
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
            const {id} = req.params;
            const user = await usersServices.deleteUserById(id);
            if (user === null) return res.sendStatus(404);
            return res.sendStatus(204);
        } catch {
            return res.sendStatus(500);
        }
    })

    // separate routes for updating user data?

    return router;
}
