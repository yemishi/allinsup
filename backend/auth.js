const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt')
const { User } = require("./models")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {

    try {
        const { displayName, email, picture } = profile
        const loadUser = await User.findOne({ name: displayName, email })

        if (!loadUser) {
            const newUser = await new User({ name: displayName, email, picture })
            await newUser.save()
            return done(null, newUser)
        }

        done(null, profile)
    } catch (error) {
        console.log(error)
    }

    return done(null, profile);
}
));



passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {

        try {
            const loadUser = await User.findOne({ name: displayName, email })

            if (!loadUser) {
                const newUser = await new User({ name: displayName, email, picture })
                await newUser.save()
                return done(null, newUser)
            }

            done(null, profile)
        } catch (error) {
            console.log(error)
        }
        return done(null, { user: "siuuuu" });
    }
));

passport.serializeUser((user, done) => {

    done(null, user);
});

passport.deserializeUser((user, done) => {

    done(null, user);

});