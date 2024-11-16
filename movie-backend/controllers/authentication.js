const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/keys');

const tokenForUser = (user) => {
	const timestamp = Math.round(Date.now() / 1000);
	return jwt.encode(
		{
			sub: user.id,
			iat: timestamp,
			// expiration
			exp: timestamp + 5 * 60 * 60,
		},
		// unique hashin algorithm (if one knows token secret they can hack in)
		keys.TOKEN_SECRET
	);
};

exports.signin = (req, res) => {
	res.send({ email: req.user.email, token: tokenForUser(req.user) });
};

exports.currentUser = (req, res) => {
	const user = {
		email: req.user.email,
		token: tokenForUser(req.user),
		watchListCount: req.user.watchList.length,
		movies: req.user.watchList,
	};
	res.send(user);
};

exports.signup = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
		//400-500  messed up 200 OK
			.status(422)
			.send({ error: 'You must provide email and password' });
	}

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		const user = new User();
		user.email = email;
		user.setPassword(password);

		await user.save();

		res.json({ token: tokenForUser(user) });
	} catch (err) {
		next(err);
	}
};
