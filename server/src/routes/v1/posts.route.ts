import express from 'express';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    getAllPosts,
    getPost,
    postPost,
    putPost,
    deletePost
} from '../../controllers/posts.controller';
import { check } from 'express-validator';
import { validateRequest } from '../../middleware/validation.middleware';
// import isAuthenticated from '../../middleware/auth.middleware';

const postRoutes = express.Router();

postRoutes.get('/', catchErrors(getAllPosts));

postRoutes.get('/:id', catchErrors(getPost));

postRoutes.post(
    '/',
    [check(['title', 'content', 'authorEmail']).notEmpty(), check('authorEmail').isEmail()],
    validateRequest,
    // isAuthenticated,
    catchErrors(postPost)
);

postRoutes.put('/:id', catchErrors(putPost));

postRoutes.delete('/:id', catchErrors(deletePost));

postRoutes.use(errorHandler);

export { postRoutes };
