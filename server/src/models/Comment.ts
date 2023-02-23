import type {User} from "./User";
import type {Post} from "./Post";

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    editedAt: Date;
    author: User;
    authorId: string;
    post: Post;
    postId: string;
    Children: Comment[];
    parent?: Comment;
    parentId?: string;
    likedBy: User[];
}
