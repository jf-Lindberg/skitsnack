import type { NextFunction, Request, Response } from 'express';
import {
    deletePostById,
    findAllPosts,
    findPostById,
    publishPost,
    updatePostById
} from '../services/posts.services';

/**
 * Fetches all posts and returns a response with the post data.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response>} - The Express response object with status 200 and post data, or status 404 if no posts are found.
 *
 * @throws {Error} - If there was an error retrieving the posts.
 */
export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await findAllPosts();
    if (posts === null) return res.sendStatus(404);
    return res.status(200).send(posts);
};

/**
 * Fetches a post by its ID and returns a response with the post data.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object containing the ID of the post to retrieve.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response>} - The Express response object with status 200 and post data, or status 404 if the post is not found.
 *
 * @throws {Error} - If there was an error retrieving the post.
 */
export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await findPostById(id);
    if (post === null) return res.sendStatus(404);
    return res.status(200).send(post);
};

/**
 * Creates a new post and returns a response with the new post data.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object containing the data for the new post.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response>} - The Express response object with status 201 and the new post data.
 *
 * @throws {Error} - If there was an error publishing the post.
 */
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const post = await publishPost(req.body);
    return res.status(201).send(post);
};

/**
 * Updates an existing post and returns a response with the updated post data.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object containing the data to update the post.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response>} - The Express response object with status 204 and the updated post data, or status 404 if the post was not found.
 *
 * @throws {Error} - If there was an error updating the post.
 */
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await updatePostById(id, req.body);
    if (post === null) return res.sendStatus(404);
    return res.status(204).send(post);
};

/**
 * Deletes an existing post by id and returns a response with status 204 if the deletion was successful, or status 404 if the post was not found.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object containing the id of the post to delete.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response>} - The Express response object with status 204 if the deletion was successful, or status 404 if the post was not found.
 *
 * @throws {Error} - If there was an error deleting the post.
 */
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await deletePostById(id);
    if (post === null) return res.sendStatus(404);
    return res.status(204).send(post);
};
