import { findPostById } from '../../../../services/posts.services';
import { getPostById } from '../../../../controllers/posts.controller';
import type { Request, Response } from 'express';

jest.mock('../../../../services/posts.services', () => ({
    findPostById: jest.fn()
}));

describe('getPostById', () => {
    it('calls findPostById once with the correct ID', async () => {
        const mockPost = { title: 'Post 1', content: 'This is post 1' };
        (findPostById as jest.Mock).mockResolvedValue(mockPost);

        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();
        await getPostById(req, res, next);

        expect(findPostById).toHaveBeenCalledTimes(1);
        expect(findPostById).toHaveBeenCalledWith('1');
    });

    it('returns 404 status when post is not found', async () => {
        const mockPost = null;
        (findPostById as jest.Mock).mockResolvedValue(mockPost);

        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        await getPostById(req, res, next);

        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('returns post with 200 status when post is retreived', async () => {
        const mockPost = [{ title: 'Post 1', content: 'This is post 1' }];
        (findPostById as jest.Mock).mockResolvedValue(mockPost);

        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();
        await getPostById(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockPost);
    });

    it('throws an error if there is an error retrieving the post', async () => {
        const mockError = new Error('Error retrieving post');
        (findPostById as jest.Mock).mockRejectedValue(mockError);

        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        await expect(getPostById(req, res, next)).rejects.toThrow(mockError);

        expect(res.sendStatus).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
