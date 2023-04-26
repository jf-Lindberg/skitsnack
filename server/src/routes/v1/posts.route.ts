import express from 'express';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../../controllers/posts.controller';
import { check } from 'express-validator';
import { validateRequest } from '../../middleware/validation.middleware';
// import isAuthenticated from '../../middleware/auth.middleware';

const postRoutes = express.Router();

postRoutes.get('/', catchErrors(getAllPosts));

postRoutes.get('/:id', catchErrors(getPostById));

postRoutes.post(
    '/',
    [check(['title', 'content', 'authorEmail']).notEmpty(), check('authorEmail').isEmail()],
    validateRequest,
    // isAuthenticated,
    catchErrors(createPost)
);

// add check & validateRequest after
// add isAuthenticated
postRoutes.put(
    '/:id',
    [check('title', 'content').notEmpty()],
    validateRequest,
    catchErrors(updatePost)
);

// add check & validateRequest
// add isAuthenticated
postRoutes.delete('/:id', catchErrors(deletePost));

postRoutes.use(errorHandler);

export { postRoutes };
