// where to look for env vars  in all dev env we will be working in 2 dev and production dev: local host or cloud prod: one that someone uses
//can scale to as many env as we want
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
	// we are in production - return the prod set of keys
	module.exports = require('./prod');
} else {
	// we are in development - return the dev keys!!!
	module.exports = require('./dev');
}

// 	Essentially what this is doing is detecting which environment that app is in (production or development) and serving a different set of keys depending on the environment. For example, look at index.js. Inside of it, we're requiring the file at the top:
