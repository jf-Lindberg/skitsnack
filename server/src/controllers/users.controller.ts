import type { NextFunction, Request, Response } from 'express';
import { deleteUserById, findAllUsers, findUserById } from '../services/users.services';
import type { User } from '@prisma/client';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await findAllUsers();
    if (users === null) return res.sendStatus(404);
    return res.status(200).send(users);
};

export const getUserByid = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = (await findUserById(id)) as Partial<User>;
    if (user === null) return res.sendStatus(404);
    delete user.password;
    return res.status(200).send(user);
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    // check that user is same as ID or Admin, implement in middleware
    const { id } = req.params;
    const user = await deleteUserById(id);
    if (user === null) return res.sendStatus(404);
    return res.sendStatus(204);
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const user = (await findUserById(userId)) as Partial<User>;
    delete user.password;
    res.json(user);
};
