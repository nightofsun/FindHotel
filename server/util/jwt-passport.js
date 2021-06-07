import passport from "passport";
import passportJWT from 'passport-jwt';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

import userModel from '../model/userModel.js';
import { jwtSecret, ROLES } from '../config/jwtConfig.js';
import { logError } from "./util.js";

const jwtPassport = () => {
    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("bearer"),
        secretOrKey: jwtSecret,
    }
    var strategy = new JwtStrategy(params, (jwt_payload, done) => {
        userModel.findOne({ id: jwt_payload.id })
            .then(user => {
                if (user) { return done(null, user); }
                return done(null, false, "Invalid User");
            })
            .catch(err => { return done(err, false, { message: "Invalid Token Credential" }); })
    });

    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: (withSession = false) =>
            passport.authenticate('jwt', { session: withSession })
    }
};
const isInRole = (role) => (req, res, next) => {
    if (!req.user)
        return res.status(404).json(logError("Need to signin"))
    const hasRole = role <= ROLES[req.user.role];
    if (hasRole) return next();
    return res.status(404).json(logError(`Required ${ROLES.name(role)} authorization
   `))
}

export {
    jwtPassport,
    isInRole
}