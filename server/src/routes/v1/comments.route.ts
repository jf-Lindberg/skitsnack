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

// Remove this route or move it to some sort of test route for admins
commentRoutes.get('/', catchErrors(getAllComments));

commentRoutes.get('/:id', catchErrors(getComment));

// add check
// look into better routes for this
commentRoutes.post('/post/:id/comment', catchErrors(postComment_));

// add check
// look into better routes for this, maybe have children as child of posts?
commentRoutes.post('/comment/:id/reply', catchErrors(postReplyToComment));

// add put route

commentRoutes.delete('/:id', catchErrors(deleteComment));

commentRoutes.use(errorHandler);

export { commentRoutes };
