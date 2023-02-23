import {User} from "../models/User";

import * as jwt from 'jsonwebtoken';

// Usually I keep the token between 5 minutes - 15 minutes
export function generateAccessToken(user: User) {
    return jwt.sign({ userId: user.id }, <string>process.env.JWT_ACCESS_SECRET, {
        expiresIn: '5m',
    });
}

// I chose 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
export function generateRefreshToken(user: User, jtId: string) {
    return jwt.sign({
        userId: user.id,
        jtId
    }, <string>process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}

export function generateTokens(user: User, jtId: string) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jtId);

    return {
        accessToken,
        refreshToken,
    };
}
