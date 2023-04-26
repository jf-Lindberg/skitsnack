import { updatePost } from '../../../../controllers/posts.controller';
import { updatePostById } from '../../../../services/posts.services';
import type { Response, Request } from 'express';
import type { PostRequestBody } from '../../../../types/requests';

jest.mock('../../../../services/posts.services', () => ({
    updatePostById: jest.fn()
}));

describe('updatePost', () => {
    let req: Request;
    let res: Response;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            },
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

    it('calls updatePostById once with correct request body', async () => {
        const mockPost = {
            id: 1,
            title: 'title',
            content: 'content',
            authorEmail: 'author@email.com'
        };
        (updatePostById as jest.Mock).mockResolvedValue(mockPost);

        await updatePost(req, res, next);

        expect(updatePostById).toHaveBeenCalledTimes(1);
        expect(updatePostById).toHaveBeenCalledWith(req.params.id, req.body);
    });

    it('returns post with 204 status when post is updated', async () => {
        const mockPost = {
            id: 1,
            title: 'title',
            content: 'content',
            authorEmail: 'author@email.com'
        };
        (updatePostById as jest.Mock).mockResolvedValue(mockPost);

        await updatePost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith(mockPost);
    });

    it('returns 404 status when post is null', async () => {
        (updatePostById as jest.Mock).mockResolvedValue(null);

        await updatePost(req, res, next);

        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('throws an error if there is an error updating the post', async () => {
        const mockError = new Error('Error updating post');
        (updatePostById as jest.Mock).mockRejectedValue(mockError);

        await expect(updatePost(req, res, next)).rejects.toThrow(mockError);

        expect(res.sendStatus).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
