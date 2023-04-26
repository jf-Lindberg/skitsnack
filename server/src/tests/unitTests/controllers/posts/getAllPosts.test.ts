import { findAllPosts } from '../../../../services/posts.services';
import { getAllPosts } from '../../../../controllers/posts.controller';
import type { Request, Response } from 'express';
import type { Post } from '@prisma/client';

jest.mock('../../../../services/posts.services', () => ({
    findAllPosts: jest.fn()
}));

describe('getAllPosts', () => {
    beforeEach(() => {
        (findAllPosts as jest.Mock).mockClear();
    });

    it('calls findAllPosts once with no arguments', async () => {
        const mockPosts = [{ title: 'Post 1', content: 'This is post 1' }];
        (findAllPosts as jest.Mock).mockResolvedValue(mockPosts);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();
        await getAllPosts(req, res, next);

        expect(findAllPosts).toHaveBeenCalledTimes(1);
        expect(findAllPosts).toHaveBeenCalledWith();
    });

    it('returns 404 status when posts are null', async () => {
        const mockPosts = null;
        (findAllPosts as jest.Mock).mockResolvedValue(mockPosts);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        await getAllPosts(req, res, next);

        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('returns array of posts with 200 status when posts are retreived', async () => {
        const mockPosts = [{ title: 'Post 1', content: 'This is post 1' }];
        (findAllPosts as jest.Mock).mockResolvedValue(mockPosts);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();
        await getAllPosts(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockPosts);
    });

    it('throws an error if there is an error retrieving the posts', async () => {
        const mockError = new Error('Error retrieving posts');
        (findAllPosts as jest.Mock).mockRejectedValue(mockError);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        await expect(getAllPosts(req, res, next)).rejects.toThrow(mockError);

        expect(res.sendStatus).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('returns an empty array with a 200 status when there are no posts', async () => {
        const mockPosts: Post[] = [];
        (findAllPosts as jest.Mock).mockResolvedValue(mockPosts);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        await getAllPosts(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockPosts);
    });
});
