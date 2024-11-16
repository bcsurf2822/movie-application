const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const Movie = require('../models/movie');

// Define our model
const UserSchema = new Schema({
	// unique: can't have more than 1
	//hash way to encrypt pword
	email: { type: String, unique: true, lowercase: true },
	hash: String,
	salt: String,
	watchList: [{ type: Movie.MovieSchema }],
});

UserSchema.methods.setPassword = function (password) {
		//hash: way to encrypt pword
		// salt: the number of different rounds how much to hashb this algo
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');

	return this.hash === hash;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
