var include = require("include");
var ApplicationRepository = include("api/repositories/ApplicationRepository");

module.exports = {
	get: function get(req, res) {
		var id = req.params.id;
		
		ApplicationRepository.get(id)
		.then(function(result) {
			res.locals.layout = "admin/layout";
			return res.view("admin/applications/view", {result: result});
		})
		.fail(function(err) {
			return res.notFound(err);
		});
	},

	all: function all(req, res) {
		ApplicationRepository.all()
		.then(function(results) {
			res.locals.layout = "admin/layout";
			return res.view("admin/applications/all", {results: results});
		}).
		fail(function(err) {
			return res.serverError(err);
		})
	},

	add: function add(req, res) {
		res.locals.layout = "admin/layout";
		return res.view("admin/applications/add");
	},

	create: function create(req, res) {
		var name = req.body.name;
		var userId = req.user.id;

		ApplicationRepository.save(name, userId)
		.then(function(result) {
			req.flash("success", "The application was created successfully");
			return res.redirect("/admin/applications");
		})
		.catch(function(err) {
			if(err) {
				req.flash('error', err);
				console.log(err);
				res.redirect("/admin/applications/add");
			}
		});
	},

	removeConfirm: function removeConfirm(req, res) {
		var id = req.params.id;
		ApplicationRepository.get(id)
		.then(function(result) {
			res.locals.layout = "admin/layout";
			return res.view("admin/applications/removeconfirm", {result: result});
		})
		.fail(function(err) {
			return res.notFound(err);
		});
	},

	remove: function remove(req, res) {
		var id = req.params.id;

		ApplicationRepository.remove(id)
		.then(function(result) {
			req.flash("success", "The application was removed successfully");
			res.redirect("/admin/applications");
		})
		.catch(function(err) {
			return res.serverError(err);
		});
	}

}