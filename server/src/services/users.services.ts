import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import { type User } from '../types/models/User';

export const usersServices = {
    createUserByEmailAndPassword: (user: { email: string; password: string }) => {
        user.password = bcrypt.hashSync(user.password, 12);
        return prisma.user.create({
            data: {
                email: user.email,
                password: user.password
            }
        });
    },
    findUserByEmail(email: User['email']) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    },
    findUserById: async (id: User['id']) => {
        return await prisma.user.findUnique({ where: { id } });
    },
    deleteUserById: async (id: User['id']) => {
        return await prisma.user.delete({ where: { id } });
    },
    findAllUsers: async () => {
        return await prisma.user.findMany({
            include: {
                posts: true,
                comments: true
            }
        });
    }
};
