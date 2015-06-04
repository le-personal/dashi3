 module.exports = function(req, res, next) {
	// instead of using true, we define an empty local user
	// so we can use it on templates
	// 
	
	if(!req.session.authenticated) {
		res.locals.authenticated = false;
	}
	else {
		res.locals.authenticated = true;
	}

	// get configuration and sync with variable
	// sails.config.settings so it's always in sync
	config.all()
	.then(function(results) {
		sails.config.settings = results;
		return next();
	})
	.fail(function(err) {
		// console.log("Can't sync values");
	});

}