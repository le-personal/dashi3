var include = require("include");
var TokenRepository = include("api/repositories/TokenRepository");

module.exports = {
	get: function get(req, res) {
		var id = req.params.id;
		
		TokenRepository.get(id)
		.then(function(result) {
			return res.view("admin/tokens/view", {result: result});
		})
		.fail(function(err) {
			return res.notFound(err);
		});
	},

	all: function all(req, res) {
		TokenRepository.all()
		.then(function(results) {
			return res.view("admin/tokens/all", {results: results});
		}).
		fail(function(err) {
			return res.serverError(err);
		})
	},

	add: function add(req, res) {
		return res.view("admin/tokens/add");
	},

	create: function create(req, res) {
		var name = req.body.name;
		var userId = req.user.id;

		TokenRepository.save(name, userId)
		.then(function(result) {
			return res.redirect("/admin/tokens");
		})
		.catch(function(err) {
			return res.redirect("/admin/tokens/add");
		});
	}

}