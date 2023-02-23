import express from "express";
import {indexRouter} from "./index.route";
import {authRouter} from "./auth.route";
import {postRouter} from "./posts.route";
import {userRouter} from "./users.route";
import {commentRouter} from "./comments.route";

const v1Router = express.Router();
v1Router.use('/', indexRouter());
v1Router.use('/auth', authRouter());
v1Router.use('/posts', postRouter());
v1Router.use('/users', userRouter());
v1Router.use('/comments', commentRouter());

export {v1Router};
