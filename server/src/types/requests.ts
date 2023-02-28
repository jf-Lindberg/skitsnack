import type { Post } from '@prisma/client';

export interface CommentRequestBody {
    content: string;
    authorEmail: string;
    postId: Post['id'];
}

export interface PostRequestBody {
    title: string;
    content: string;
    authorEmail: string;
}
