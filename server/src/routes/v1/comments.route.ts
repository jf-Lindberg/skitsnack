import express from 'express';
import { catchErrors, errorHandler } from '../../middleware/error.middleware';
import {
    deleteComment,
    getAllComments,
    getComment,
    postComment_,
    postReplyToComment
} from '../../controllers/comments.controller';

const commentRoutes = express.Router();

commentRoutes.get('/', catchErrors(getAllComments));

commentRoutes.get('/:id', catchErrors(getComment));

commentRoutes.delete('/:id', catchErrors(deleteComment));

// look into better routes for this
commentRoutes.post('/post/:id/comment', catchErrors(postComment_));

// look into better routes for this, maybe have children as child of posts?
commentRoutes.post('/comment/:id/reply', catchErrors(postReplyToComment));

commentRoutes.use(errorHandler);

export { commentRoutes };
