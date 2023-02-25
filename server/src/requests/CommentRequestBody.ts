import type { Post } from '../models/Post';

export interface CommentRequestBody {
    content: string;
    authorEmail: string;
    postId: Post['id'];
}
