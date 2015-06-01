var include = require("include");
var TokenRepository = include("api/repositories/TokenRepository");

module.exports = {
	get: function get(req, res) {
		var id = req.params.id;
		
		TokenRepository.get(id)
		.then(function(result) {
			res.locals.layout = "admin/layout";
			return res.view("admin/tokens/view", {result: result});
		})
		.fail(function(err) {
			return res.notFound(err);
		});
	},

	all: function all(req, res) {
		TokenRepository.all()
		.then(function(results) {
			res.locals.layout = "admin/layout";
			return res.view("admin/tokens/all", {results: results});
		}).
		fail(function(err) {
			return res.serverError(err);
		})
	},

	add: function add(req, res) {
		res.locals.layout = "admin/layout";
		return res.view("admin/tokens/add");
	},

	create: function create(req, res) {
		var name = req.body.name;
		var userId = req.user.id;

		TokenRepository.save(name, userId)
		.then(function(result) {
			req.flash("success", "The token was created successfully");
			return res.redirect("/admin/tokens");
		})
		.catch(function(err) {
			if(err) {
				req.flash('error', err);
				console.log(err);
				res.redirect("/admin/tokens/add");
			}
		});
	},

	removeConfirm: function removeConfirm(req, res) {
		var id = req.params.id;
		TokenRepository.get(id)
		.then(function(result) {
			res.locals.layout = "admin/layout";
			return res.view("admin/tokens/removeconfirm", {result: result});
		})
		.fail(function(err) {
			return res.notFound(err);
		});
	},

	remove: function remove(req, res) {
		var id = req.params.id;

		TokenRepository.remove(id)
		.then(function(result) {
			req.flash("success", "The token was removed successfully");
			res.redirect("/admin/tokens");
		})
		.catch(function(err) {
			return res.serverError(err);
		});
	}

}