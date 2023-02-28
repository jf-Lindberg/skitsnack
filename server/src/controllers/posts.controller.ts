import type { NextFunction, Request, Response } from 'express';
import {
    deletePostById,
    findAllPosts,
    findPostById,
    publishPost,
    updatePostById
} from '../services/posts.services';

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await findAllPosts();
    if (posts === null) return res.sendStatus(404);
    return res.status(200).send(posts);
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await findPostById(id);
    if (post === null) return res.sendStatus(404);
    return res.status(200).send(post);
};

export const postPost = async (req: Request, res: Response, next: NextFunction) => {
    const post = await publishPost(req.body);
    return res.status(201).send(post);
};

export const putPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await updatePostById(id, req.body);
    if (post === null) return res.sendStatus(404);
    return res.status(204).send(post);
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await deletePostById(id);
    if (post === null) return res.sendStatus(404);
    return res.sendStatus(204);
};
