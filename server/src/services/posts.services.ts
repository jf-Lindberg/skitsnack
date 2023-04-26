import prisma from '../utils/prisma';
import type { Post } from '@prisma/client';
import type { PostRequestBody } from '../types/requests';
import { ResponseError } from '../errors/ResponseError';

/**
 * Returns all posts from the database with additional data about their author, likes, and comments.
 *
 * @async
 * @function
 * @returns {Promise<Post[]>} - Array of posts with additional data.
 */
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

/**
 * Finds a post by its ID and returns it with its author, likedBy, and comments data.
 *
 * @async
 * @function
 * @param {number} id - The ID of the post to find.
 * @returns {Promise<Post | null>} - A Promise that resolves to the found Post object, or null if not found.
 */
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

/**
 * Creates a new post with the provided request body and sets the published field to true.
 *
 * @async
 * @function
 * @param {PostRequestBody} body - The request body containing the post data to create.
 * @returns {Promise<Post>} - A promise that resolves to the created post.
 * @throws {ResponseError} - If there was an error creating the post, with a 500 HTTP status code.
 */
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

/**
 * Updates an existing post with the specified ID and returns the updated post data.
 *
 * @async
 * @function
 * @param {number} id - The ID of the post to update.
 * @param {Object} body - An object containing the new data for the post.
 * @param {string} [body.title] - The new title for the post.
 * @param {string} [body.content] - The new content for the post.
 * @returns {Promise<Post>} - The updated post data.
 *
 * @throws {ResponseError} - If there was an error updating the post, a ResponseError with status 500 is thrown.
 */
export const updatePostById = async (id: Post['id'], body: Partial<Post>): Promise<Post> => {
    const { title, content } = body;
    try {
        return await prisma.post.update({
            where: { id },
            data: {
                title,
                content
            }
        });
    } catch (e) {
        throw new ResponseError('Unable to update post', 500);
    }
};

/**
 * Deletes a post from the database by its ID.
 *
 * @async
 * @function
 * @param {Post['id']} id - The ID of the post to be deleted.
 * @returns {Promise<Post>} - The deleted post.
 *
 * @throws {Error} - If there was an error deleting the post.
 */
export const deletePostById = async (id: Post['id']): Promise<Post> => {
    return await prisma.post.delete({ where: { id } });
};
// likePost: async (id: Post['id'], user: User['id'])
