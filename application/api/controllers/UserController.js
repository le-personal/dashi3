var include = require("include");
var UserRepository = include("api/repositories/UserRepository");

var UserController = {};

UserController.getSettings = function getSettings(req, res) {
	var id = req.user.id;
	
	UserRepository.get(id)
	.then(function(result) {
		res.locals.layout = "admin/layout";
		return res.view("admin/user/settings", {result: result});
	})
	.fail(function(err) {
		return res.notFound(err);
	});
}

UserController.postSettings = function postSettings(req, res) {

}

module.exports = UserController;