// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { prismaMock } from '../../../setup/prisma/singleton';
import { publishPost } from '../../../../services/posts.services';
import { ResponseError } from '../../../../errors/ResponseError';
import type ResolvedValue = jest.ResolvedValue;

describe('publishPost', () => {
    let input;
    let expected;

    beforeEach(() => {
        input = {
            title: 'Test Post',
            content: 'This is a test post.',
            authorEmail: 'test@example.com'
        };

        expected = {
            id: '0000-0000-0000-0000',
            title: 'Test Post',
            content: 'This is a test post.',
            author: {
                email: 'test@example.com'
            },
            authorId: '8da3a188-0a34-4d22-b1bf-c48737a8f7f7',
            createdAt: new Date(),
            updatedAt: new Date(),
            published: true
        };
    });
    // RESET TEST DB
    it('creates a new post when user exists', async () => {
        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        // https://stackoverflow.com/questions/65659532/jest-how-to-test-mock-argument-has-property-ignoring-rest-of-argument-class
        // currently does not reset db

        await expect(publishPost(input)).resolves.toMatchObject({
            id: expect.any(String),
            title: expected.title,
            content: expected.content,
            authorId: expected.authorId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            published: expected.published
        });
    });

    it('does not allow posting if no user exists with email specified', async () => {
        input.authorEmail = 'nonexistant@user.com';

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishpost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });

    it('does not allow posting if no email is specified', async () => {
        delete input.authorEmail;

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishPost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });

    it('does not allow posting if no content is specified', async () => {
        delete input.content;

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishPost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });

    it('does not allow posting with no title specified', async () => {
        delete input.title;

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishPost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });

    it('does not allow posting with empty object', async () => {
        delete input.title;
        delete input.content;
        delete input.authorEmail;

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishPost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });

    it('does not allow posting with undefined properties', async () => {
        input.title = undefined;
        input.content = undefined;
        input.authorEmail = undefined;

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishPost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });

    it('does not allow posting with null properties', async () => {
        input.title = null;
        input.content = null;
        input.authorEmail = null;

        prismaMock.post.create.mockResolvedValue(expected as unknown as ResolvedValue<unknown>);

        try {
            await publishPost(input);
            // failsafe to make sure publishPost indeed does throw an error
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }
    });
});
