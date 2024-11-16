const Movie = require('../models/movie');
const User = require('../models/user');

exports.addMovieToList = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user._id });

		const movie = new Movie.MovieModel(req.body.movie);
		await movie.save();

		user.watchList.push(movie);
		await user.save();

		res.send({
			movie,
			watchListCount: user.watchList.length,
		});
	} catch (err) {
		next(err);
	}
};

exports.getWatchList = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user._id });

		res.send({
			movies: user.watchList,
			watchListCount: user.watchList.length,
		});
	} catch (err) {
		next(err);
	}
};
