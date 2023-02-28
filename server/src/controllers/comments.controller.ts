import type { NextFunction, Request, Response } from 'express';
import {
    deleteCommentById,
    findAllComments,
    findCommentById,
    replyToCommentById,
    postComment
} from '../services/comments.services';

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    const comments = await findAllComments();
    if (comments === null) return res.sendStatus(404);
    return res.status(200).send(comments);
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const comment = await findCommentById(id);
    if (comment === null) return res.sendStatus(404);
    return res.status(200).send(comment);
    return res.sendStatus(500);
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const comment = await deleteCommentById(id);
    if (comment === null) return res.sendStatus(404);
    return res.sendStatus(204);
};

export const postComment_ = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const comment = await postComment(id, req.body);
    if (comment === null) return res.sendStatus(404);
    return res.status(201).send(comment);
};

export const postReplyToComment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const comment = await replyToCommentById(id, req.body);
    if (comment === null) return res.sendStatus(404);
    return res.status(201).send(comment);
};
