import prisma from '../utils/prisma';
import type { Comment, Post } from '@prisma/client';
import type { CommentRequestBody } from '../types/requests';

export const findAllComments = async () => {
    return await prisma.comment.findMany({
        include: {
            author: true,
            post: true,
            Children: true,
            parent: true
        }
    });
};

export const findCommentById = async (id: Comment['id']) => {
    return await prisma.comment.findMany({
        where: { id },
        include: {
            author: true,
            post: true,
            Children: true,
            parent: true
        }
    });
};

export const deleteCommentById = async (id: Comment['id']) => {
    return await prisma.comment.delete({ where: { id } });
};

export const postComment = async (postId: Post['id'], body: CommentRequestBody) => {
    const { content, authorEmail } = body;
    return await prisma.comment.create({
        data: {
            content,
            author: { connect: { email: authorEmail } },
            post: { connect: { id: postId } }
        }
    });
};

export const replyToCommentById = async (parentId: Comment['id'], body: CommentRequestBody) => {
    const { content, authorEmail, postId } = body;
    return await prisma.comment.create({
        data: {
            content,
            author: { connect: { email: authorEmail } },
            post: { connect: { id: postId } },
            parent: { connect: { id: parentId } }
        }
    });
};
