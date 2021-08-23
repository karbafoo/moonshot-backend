const {Strategy, ExtractJwt} = require('passport-jwt');
const {USER_SECRET} = require('./config');
const UserController = require('./controllers/user');

const UserJWTPassport = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.passReqToCallback = true;
    opts.secretOrKey = USER_SECRET;
    // opts.issuer = '???';
    // opts.audience = '???';

    passport.use(
        'jwt.user',
        new Strategy(opts, function (req, jwt_payload, done) {
            UserController.getUserByAccountId(jwt_payload)
                .then((userDoc) => {
                    return done(null, userDoc);
                })
                .catch((err) => {
                    return done(null, null, err);
                });
        })
    );
};

module.exports = UserJWTPassport;
