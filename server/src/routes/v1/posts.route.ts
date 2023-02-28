import express from 'express';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    getAllPosts,
    getPost,
    postPost,
    putPost,
    deletePost
} from '../../controllers/posts.controller';

const postRoutes = express.Router();

postRoutes.get('/', catchErrors(getAllPosts));

postRoutes.get('/:id', catchErrors(getPost));

postRoutes.post('/', catchErrors(postPost));

postRoutes.put('/:id', catchErrors(putPost));

postRoutes.delete('/:id', catchErrors(deletePost));

postRoutes.use(errorHandler);

export { postRoutes };
