import prisma from '../utils/prisma';
import type { Post } from '@prisma/client';
import type { PostRequestBody } from '../types/requests';
import { ResponseError } from '../errors/ResponseError';

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

// rename to createPost
export const publishPost = async (body: PostRequestBody): Promise<Post> => {
    const { title, content, authorEmail } = body;
    const author = { connect: { email: authorEmail } };
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                author,
                published: true
            }
        });

        return post ?? null;
    } catch (e) {
        throw new ResponseError('Unable to create post.', 500);
    }
};

export const updatePostById = async (id: Post['id'], body: Partial<Post>): Promise<Post> => {
    const { title, content } = body;
    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                content
            }
        });

        return post;
    } catch (e) {
        throw new ResponseError('Unable to update post', 500);
    }
};

export const deletePostById = async (id: Post['id']): Promise<Post> => {
    return await prisma.post.delete({ where: { id } });
};
// likePost: async (id: Post['id'], user: User['id'])
