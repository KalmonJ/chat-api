import passport from "passport";
import JwtStrategy, { StrategyOptions } from "passport-jwt";
import { usersModel } from "../models/users";

const strategy = JwtStrategy.Strategy;
const extract = JwtStrategy.ExtractJwt;

const opts: StrategyOptions = {
  jwtFromRequest: extract.fromAuthHeaderAsBearerToken(),
  secretOrKey: "asodkaosdoaksdoakd",
};

passport.use(
  new strategy(opts, async function (jwtPayload, done) {
    usersModel.findOne(
      { id: jwtPayload.id },
      function (err: any, user: { email: string }) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      }
    );
  })
);
