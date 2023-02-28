import prisma from '../utils/prisma';
import type { Post } from '@prisma/client';
import type { PostRequestBody } from '../types/requests';

export const findAllPosts = async (): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            likedBy: true,
            comments: true
        }
    });
    return posts ?? [];
};

export const findPostById = async (id: Post['id']): Promise<Post | null> => {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: true,
            likedBy: true,
            comments: true
        }
    });
    return post ?? null;
};

export const publishPost = async (body: PostRequestBody): Promise<Post> => {
    const { title, content, authorEmail } = body;
    const author = { connect: { email: authorEmail } };
    return await prisma.post.create({
        data: {
            title,
            content,
            author,
            published: true
        }
    });
};

export const updatePostById = async (id: Post['id'], body: Partial<Post>): Promise<Post> => {
    const { title, content } = body;
    return await prisma.post.update({
        where: { id },
        data: {
            title,
            content
        }
    });
};

export const deletePostById = async (id: Post['id']): Promise<Post> => {
    return await prisma.post.delete({ where: { id } });
};
// likePost: async (id: Post['id'], user: User['id'])
