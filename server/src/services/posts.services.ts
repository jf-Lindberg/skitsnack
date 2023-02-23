import db from "../utils/db";
import {PostRequestBody} from "../requests/PostRequestBody";
import {Post} from "../models/Post";
const prisma = db;

export const postsServices = {
    findAllPosts: async () => {
        return await prisma.post.findMany({
            include: {
                author: true,
                likedBy: true,
                comments: true
            }
        });
    },
    findPostById: async (id: Post['id']) => {
        return await prisma.post.findUnique({
            where: {id},
            include: {
                author: true,
                likedBy: true,
                comments: true
            }
        });
    },
    publishPost: async (body: PostRequestBody) => {
        const {title, content, authorEmail} = body;
        return await prisma.post.create({
            data: {
                title,
                content,
                author: {connect: {email: authorEmail}},
                published: true
            }
        });
    },
    updatePostById: async (id: Post['id'], body: PostRequestBody) => {
        const {title, content} = body;
        return await prisma.post.update({
            where: {id},
            data: {
                title,
                content
            }
        });
    },
    deletePostById: async (id: Post['id']) => {
        return await prisma.post.delete({where: {id}});
    },
    // likePost: async (id: Post['id'], user: User['id'])
}
