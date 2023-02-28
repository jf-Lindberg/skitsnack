import express from 'express';
import { indexRoutes } from './index.route';
import { authRoutes } from './auth.routes';
import { postRoutes } from './posts.route';
import { userRoutes } from './users.route';
import { commentRoutes } from './comments.route';

const routerVersion1 = express.Router();
routerVersion1.use('/', indexRoutes);
routerVersion1.use('/auth', authRoutes);
routerVersion1.use('/posts', postRoutes);
routerVersion1.use('/users', userRoutes);
routerVersion1.use('/comments', commentRoutes);

export { routerVersion1 };
