// https://embed.plnkr.co/plunk/TRi8rd for reference
// perhaps add flash message here as well (after false), see:
// https://www.digitalocean.com/community/tutorials/easy-node-authentication-setup-and-local#toc-handling-signupregistration

import passport from "passport";
import db from "./db";
import {Strategy as LocalStrategy} from "passport-local";
import {User} from "../models/User";
import bcrypt from "bcrypt";

const prisma = db;

export const passportConfig = (passport: passport.PassportStatic) => {
    passport.serializeUser((user, done: Function) => {
        done(null, (user as User).id);
    });

    passport.deserializeUser(async (id: string, done: Function) => {
        const user = await prisma.user.findUnique({ where: {id}});
        if (!user) return done('No user to deserialize');

        return done(null, user);
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            const user = await prisma.user.findUnique({where: {email}});
            if (user) return done(null, false);
            const saltRounds = 10;
            // Generate hash and store user in db
            bcrypt.hash(password, saltRounds, async (err: Error | undefined, hash: string) => {
                if (err) return done(err, false);
                const user = await prisma.user.create({
                    data: {
                        email: email,
                        hashedPassword: hash
                    }
                });
                return done(null, user);
            });
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            const user = await prisma.user.findUnique({where: {email}});
            if (!user) return done(null, false, {message: "No such user exists."});
            const match = await bcrypt.compare(password, user.hashedPassword);
            if (!match) return done(null, false, {message: "Wrong password."});
            return done(null, user);
        }));

    // passport.use('admin-signup', new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true
    //     },
    //     async (req, email, password, done) => {
    //         const user = await prisma.user.findUnique({where: {email}});
    //         if (user) return done(null, false);
    //         const saltRounds = 10;
    //         // Generate hash and store user in db
    //         bcrypt.hash(password, saltRounds, async (err: Error | undefined, hash: string) => {
    //             if (err) return done(err, false);
    //             await prisma.user.create({
    //                 data: {
    //                     email: email,
    //                     hashedPassword: hash,
    //                     userType: 'ADMIN'
    //                 }
    //             });
    //         });
    //     }));
    //
    // passport.use('admin-login', new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true
    //     },
    //     async (req, email, password, done) => {
    //         const user = await prisma.user.findUnique({where: {email}});
    //         if (!user) return done(null, false, {message: "No such user exists."});
    //         const userIsAdmin = user.userType === "ADMIN";
    //         if (!userIsAdmin) return done(null, false, {message: "User is not admin"});
    //         const match = await bcrypt.compare(password, user.hashedPassword);
    //         if (!match) return done(null, false, {message: "Wrong password."});
    //         return done(null, user);
    //     }));
}


