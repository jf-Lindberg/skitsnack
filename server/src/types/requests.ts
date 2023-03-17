import type { Post, User, Comment } from '@prisma/client';

export interface CommentRequestBody {
    content: Comment['content'];
    authorEmail: User['email'];
    postId: Post['id'];
}

export interface PostRequestBody {
    title: Post['title'];
    content: Post['content'];
    authorEmail: User['email'];
}
