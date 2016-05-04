const { Router } = require('express');
const Users = require('../database/users');
const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const co = require('co');
const { Strategy: GoogleStrategy } = require('passport-google-oauth2');
const router = Router(); // eslint-disable-line

passport.use(new BearerStrategy((token, cb) => Users
        .where('token', token)
        .findOne()
        .then(user => cb(null, user))
        .catch(error => cb(error))));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_URL,
    passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => co(function* saveUser() {
    const existingUser = yield Users.where('id', profile.id).findOne();

    if (!existingUser) {
        const user = new Users(Object.assign(profile._json, { token: accessToken }));

        yield user.save();

        return done(null, user);
    }

    existingUser.set('token', accessToken);

    yield existingUser.save();

    return done(null, existingUser);
})));

passport.serializeUser((user, done) => done(null, user.attributes._id));

passport.deserializeUser((_id, done) => Users.findById(_id).then(user => {
    done(null, user);
}));

router.use(cookieParser());
router.use(session({
    secret: 'cookie_secret',
    name: 'auth',
    store: new RedisStore({ url: process.env.REDIS_URL }),
    proxy: true,
    resave: true,
    saveUninitialized: true,
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/test', (req, res) => res.send(req.user));

router.get('/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
});

router.get('/oauth',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login',
    }));

module.exports = router;
