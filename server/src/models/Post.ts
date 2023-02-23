import type {User} from "./User";

export interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: Date;
    editedAt?: Date;
    author: User;
    authorId: String;
    likedBy: User[];
    comments: Comment[]
}