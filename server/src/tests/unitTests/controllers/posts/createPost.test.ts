import { createPost } from '../../../../controllers/posts.controller';
import { publishPost } from '../../../../services/posts.services';
import type { Response, Request } from 'express';
import type { PostRequestBody } from '../../../../types/requests';

jest.mock('../../../../services/posts.services', () => ({
    publishPost: jest.fn()
}));

describe('createPost', () => {
    let req: Request;
    let res: Response;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                title: 'title',
                content: 'content',
                authorEmail: 'author@email.com'
            } as PostRequestBody
        } as unknown as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;
        next = jest.fn();
    });

    it('calls publishPost once with correct request body', async () => {
        const mockPost = { title: 'title', content: 'content', authorEmail: 'author@email.com' };
        (publishPost as jest.Mock).mockResolvedValue(mockPost);

        await createPost(req, res, next);

        expect(publishPost).toHaveBeenCalledTimes(1);
        expect(publishPost).toHaveBeenCalledWith(req.body);
    });

    it('returns post with 201 status when post is created', async () => {
        const mockPost = { title: 'title', content: 'content', authorEmail: 'author@email.com' };
        (publishPost as jest.Mock).mockResolvedValue(mockPost);

        await createPost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(mockPost);
    });

    it('throws an error if there is en error creating the post', async () => {
        const mockError = new Error('Error creating post');
        (publishPost as jest.Mock).mockRejectedValue(mockError);

        await expect(createPost(req, res, next)).rejects.toThrow(mockError);

        expect(res.sendStatus).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
