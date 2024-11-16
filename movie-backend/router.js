const Authentication = require('./controllers/authentication');
const WatchList = require('./controllers/watchList');
const passport = require('passport');

//middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//where we are listening for req for routes and passing routes to contrl (function that will be invoked at certain routes)
module.exports = function (app) {
	app.post('/auth/signin', requireSignin, Authentication.signin);
	app.post('/auth/signup', Authentication.signup);
	app.get('/auth/current_user', requireAuth, Authentication.currentUser);
	app.post('/api/watchList', requireAuth, WatchList.addMovieToList);
	app.get('/api/watchList', requireAuth, WatchList.getWatchList);
};
