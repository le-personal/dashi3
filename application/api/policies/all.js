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

	return next();
}