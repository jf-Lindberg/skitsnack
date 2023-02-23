import express, {NextFunction, Request, Response} from 'express';
import {commentsServices} from "../../services/comments.services";

const router = express.Router();

export const commentRouter = () => {
    router.get('/comments', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comments = await commentsServices.findAllComments();
            if (comments === null) return res.sendStatus(404);
            return res.status(200).send(comments);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.get('/comments/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const comment = await commentsServices.findCommentById(id);
            if (comment === null) return res.sendStatus(404);
            return res.status(200).send(comment);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.delete('/comments/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const comment = await commentsServices.deleteCommentById(id);
            if (comment === null) return res.sendStatus(404);
            return res.sendStatus(204);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.post('/post/:id/comment', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const comment = await commentsServices.postComment(id, req.body);
            if (comment === null) return res.sendStatus(404);
            return res.status(201).send(comment);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.post('/comment/:id/reply', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const comment = await commentsServices.replyToCommentById(id, req.body);
            if (comment === null) return res.sendStatus(404);
            return res.status(201).send(comment);
        } catch {
            return res.sendStatus(500);
        }
    });

    return router;
}
