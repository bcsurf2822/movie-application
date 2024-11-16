const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function (
	email,
	password,
	done
) {
	// Verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return done(null, false);
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		})
		.catch((err) => {
			return done(err);
		});
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.TOKEN_SECRET,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call done without a user object

	User.findById(payload.sub).then((user) => {
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
