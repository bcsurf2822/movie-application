const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const movieSchema = new Schema({
	id: Number,
	vote_count: Number,
	video: Boolean,
	vote_average: Number,
	title: String,
	popularity: Number,
	poster_path: String,
	original_language: String,
	original_title: String,
	genre_ids: Array,
	backdrop_path: String,
	adult: Boolean,
	overview: String,
	release_date: String,
});

const MovieModel = mongoose.model('movie', movieSchema);

module.exports = {
	MovieModel,
	MovieSchema: movieSchema,
};
