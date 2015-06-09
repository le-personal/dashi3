var include = require("include");
var DashboardRepository = include("api/repositories/DashboardRepository");

module.exports = function(req, res, next) {
	var id = req.params.id;

	/** 
	 * Check if a dashboard is public
	 * if it is, go to next
	 * if is not, check if the user is authenticated, and then next
	 * else, deny access to Castle Grayskull
	 */
	DashboardRepository.get(id)
	.then(function(result) {
		if(result.public) {
			return next();
		}
		else if(req.session.authenticated) {
			return next();
		}
		else {
			// if this is a JSON request, return forbidden
			if(req.wantsJSON) {
				return res.forbidden();
			}
			// or return to the login path
			else {
				return res.redirect("/login");
			}
		}
	})
	.fail(function(err) {
		return res.notFound(err);
	});

}