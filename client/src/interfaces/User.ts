import type {Post} from "./Post";

export interface User {
    id: string;
    email: string;
    hashedPassword: string;
    userType: string;
    username: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    likedPosts: Post[];
    comments: Comment[];
    likedComments: Comment[];
}
