import prisma from '../utils/prisma';
import hash from '../utils/hash';

// used when we create a refresh token.
export function addRefreshTokenToWhitelist(jti: string, refreshToken: string, userId: string) {
    return prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hash(refreshToken),
            userId
        }
    });
}

// used to check if the token sent by the client is in the database.
export function findRefreshTokenById(id: string) {
    return prisma.refreshToken.findUnique({
        where: {
            id
        }
    });
}

// soft delete tokens after usage.
export function deleteRefreshToken(id: string) {
    return prisma.refreshToken.update({
        where: {
            id
        },
        data: {
            revoked: true
        }
    });
}

export async function revokeTokens(userId: string) {
    return await prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}
