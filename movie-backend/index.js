const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const passport = require('passport');
require('./services/passport');

const app = express();
//prevents domains that aren't the same from requesting or communicating with eachother bad site getting something from good site vice versa  - blocks it from doing so
app.use(cors());
//we want to "parse" the body and use it as JSON
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//initialze passport
app.use(passport.initialize());

router(app);

// Server Setup
const port = process.env.PORT || 8080;

// DB Setup mongo = doc store and monggose the way to handle the docs 
mongoose
	.connect(keys.MONGO_URI, {
		// boilerplate for mongo
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('🚀 DB Connected!');
		app.listen(port, () => {
			console.log('😎 Server listening on:', port);
		});
	})
	.catch((err) => {
		// getting this message likely that you don't have mongo set up correctly or proper library installed
		console.log(`❌ DB Connection Error: ${err.message}`);
	});
