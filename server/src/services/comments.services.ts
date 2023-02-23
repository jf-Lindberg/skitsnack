import db from "../utils/db";
import {Comment} from "../models/Comment";
import {Post} from "../models/Post";
import {CommentRequestBody} from "../requests/CommentRequestBody";

const prisma = db;

export const commentsServices = {
    findAllComments: async () => {
        return await prisma.comment.findMany({
            include: {
                author: true,
                post: true,
                Children: true,
                parent: true
            }
        })
    },
    findCommentById: async (id: Comment['id']) => {
        return await prisma.comment.findMany({
            where: {id},
            include: {
                author: true,
                post: true,
                Children: true,
                parent: true
            }
        })
    },
    deleteCommentById: async (id: Comment['id']) => {
        return await prisma.comment.delete({where: {id}});
    },
    postComment: async (postId: Post['id'], body: CommentRequestBody) => {
        const {content, authorEmail} = body;
        return await prisma.comment.create({
            data: {
                content,
                author: {connect: {email: authorEmail}},
                post: {connect: {id: postId}}
            }
        });
    },
    replyToCommentById: async (parentId: Comment['id'], body: CommentRequestBody) => {
        const {content, authorEmail, postId} = body;
        return await prisma.comment.create({
            data: {
                content,
                author: {connect: {email: authorEmail}},
                post: {connect: {id: postId}},
                parent: {connect: {id: parentId}}
            }
        })
    }
}
