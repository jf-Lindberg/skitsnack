import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import type { User } from '@prisma/client';

export const createUserByEmailAndPassword = (user: { email: string; password: string }) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
        data: {
            email: user.email,
            password: user.password
        }
    });
};

export const findUserByEmail = (email: User['email']) => {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
};

export const findUserById = async (id: User['id']) => {
    return await prisma.user.findUnique({ where: { id } });
};

export const deleteUserById = async (id: User['id']) => {
    return await prisma.user.delete({ where: { id } });
};

export const findAllUsers = async () => {
    return await prisma.user.findMany({
        include: {
            posts: true,
            comments: true
        }
    });
};
