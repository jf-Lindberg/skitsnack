import bcrypt from "bcrypt";
import db from "../utils/db";
import {User} from "../models/User";

const prisma = db;

export const usersServices = {
    createUserByEmailAndPassword: (user: {email: string, password: string}) => {
        user.password = bcrypt.hashSync(user.password, 12);
        return prisma.user.create({
            data: {
                email: user.email,
                password: user.password
            },
        });
    },
    findUserByEmail(email: User['email']) {
        return db.user.findUnique({
            where: {
                email,
            },
        });
    },
    findUserById: async (id: User['id']) => {
        return await prisma.user.findUnique({where: {id}});
    },
    deleteUserById: async (id: User['id']) => {
        return await prisma.user.delete({where: {id}});
    },
    findAllUsers: async () => {
        return await prisma.user.findMany({
            include: {
                posts: true,
                comments: true
            }
        });
    },
}
