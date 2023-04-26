import { deletePost } from '../../../../controllers/posts.controller';
import { deletePostById } from '../../../../services/posts.services';
import type { Response, Request } from 'express';

jest.mock('../../../../services/posts.services', () => ({
    deletePostById: jest.fn()
}));

describe('deletePost', () => {
    let req: Request;
    let res: Response;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        } as unknown as Request;

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        } as unknown as Response;

        next = jest.fn();
    });

    it('calls deletePostById once with correct request body', async () => {
        const mockPost = {
            id: 1,
            title: 'title',
            content: 'content',
            authorEmail: 'author@email.com'
        };
        (deletePostById as jest.Mock).mockResolvedValue(mockPost);

        await deletePost(req, res, next);

        expect(deletePostById).toHaveBeenCalledTimes(1);
        expect(deletePostById).toHaveBeenCalledWith(req.params.id);
    });

    it('returns post with 204 status when post is deleted', async () => {
        const mockPost = {
            id: 1,
            title: 'title',
            content: 'content',
            authorEmail: 'author@email.com'
        };
        (deletePostById as jest.Mock).mockResolvedValue(mockPost);

        await deletePost(req, res, next);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith(mockPost);
    });

    it('returns 404 status when post is null', async () => {
        (deletePostById as jest.Mock).mockResolvedValue(null);

        await deletePost(req, res, next);

        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('throws an error if there is an error updating the post', async () => {
        const mockError = new Error('Error updating post');
        (deletePostById as jest.Mock).mockRejectedValue(mockError);

        await expect(deletePost(req, res, next)).rejects.toThrow(mockError);

        expect(res.sendStatus).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
