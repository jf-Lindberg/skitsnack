import { findAllPosts } from '../../../../services/posts.services';
import type { Post } from '@prisma/client';

describe('findAllPosts', () => {
    // try something where reset database and then call findAll? expect empty array

    it('finds posts', () => {
        expect(findAllPosts()).resolves.toBeInstanceOf(Array<Post>);
    });
});
