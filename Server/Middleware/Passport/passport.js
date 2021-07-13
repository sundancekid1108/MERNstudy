import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../../Database/Model/User/User';
import Jwt from 'jsonwebtoken';
dotenv.config();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

//Jwt stragey
passport.use(
    new Strategy(jwtOptions, (jwtPayload, done) => {
        User.findById(jwtPayload.id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((err) => {
                res.json(err);
            });
    }),
);