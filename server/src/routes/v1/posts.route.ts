import express, { type NextFunction, type Request, type Response } from 'express';
import { postsServices } from '../../services/posts.services';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postsServices.findAllPosts();
        if (posts === null) return res.sendStatus(404);
        return res.status(200).send(posts);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await postsServices.findPostById(id);
        if (post === null) return res.sendStatus(404);
        return res.status(200).send(post);
    } catch {
        return res.sendStatus(500);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postsServices.publishPost(req.body);
        return res.status(201).send(post);
    } catch {
        return res.sendStatus(500);
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await postsServices.updatePostById(id, req.body);
        if (post === null) return res.sendStatus(404);
        return res.status(204).send(post);
    } catch {
        return res.sendStatus(500);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await postsServices.deletePostById(id);
        if (post === null) return res.sendStatus(404);
        return res.sendStatus(204);
    } catch {
        return res.sendStatus(500);
    }
});

export { router as postRouter };
