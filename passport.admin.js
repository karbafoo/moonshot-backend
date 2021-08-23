const {Strategy, ExtractJwt} = require('passport-jwt');
const {ADMIN_SECRET} = require('./config');

const AdminJWTPassport = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.passReqToCallback = true;
    opts.secretOrKey = ADMIN_SECRET;
    // opts.issuer = '???';
    // opts.audience = '???';

    passport.use(
        'jwt.admin',
        new Strategy(opts, function (req, jwt_payload, done) {
            AdminController.authenticate(jwt_payload)
                .then((adminDoc) => {
                    return done(null, admin);
                })
                .catch((err) => {
                    return done(null, null, err);
                });
        })
    );
};

module.exports = AdminJWTPassport;
