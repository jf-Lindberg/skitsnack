import express, {NextFunction, Request, Response} from 'express';
import {postsServices} from "../../services/posts.services";

const router = express.Router();

export const postRouter = () => {
    router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await postsServices.findAllPosts();
            if (posts === null) return res.sendStatus(404);
            return res.status(200).send(posts);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.get('/post/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const post = await postsServices.findPostById(id);
            if (post === null) return res.sendStatus(404);
            return res.status(200).send(post);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.post('/post', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await postsServices.publishPost(req.body);
            return res.status(201).send(post);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.put('/post/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const post = await postsServices.updatePostById(id, req.body);
            if (post === null) return res.sendStatus(404);
            return res.status(204).send(post);
        } catch {
            return res.sendStatus(500);
        }
    });

    router.delete('/post/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const post = await postsServices.deletePostById(id);
            if (post === null) return res.sendStatus(404);
            return res.sendStatus(204);
        } catch {
            return res.sendStatus(500);
        }
    });

    return router;
}
