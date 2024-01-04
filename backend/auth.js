const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id);
        if (user) {
            done(null, user);
        } else {
            done(new Error('Usuário não encontrado'));
        }
    } catch (error) {
        console.error(error);
        done("aaaaa");
    }
});

passport.use(new LocalStrategy(
    {
        usernameField: 'tel',
    },
    async (tel, done) => {
        try {
            const user = await User.findOne({ tel });
            
            return done(null, user);
        } catch (error) {
            console.error(error);
            return done("a");
        }
    }
));

module.exports = passport;