var Config = require("config-persistence");
var _ = require("lodash");

var db = 2;
var options = {
	port: sails.config.session.port,
	host: sails.config.session.host,
}

module.exports = {
	getSettings: function getSettings(req, res) {

		var client = new Config(db, options);

		client.all()
		.then(function(results) {
			console.log(results);
			res.locals.layout = "admin/layout";
			res.view("admin/settings/settings", {config: results});
		})
		.fail(function(err) {
			return res.serverError(err);
		})
	},

	postSettings: function postSettings(req, res) {
		var client = new Config(db, options);


		var settings = req.body;
		
		client.set("theme", settings.theme);
		client.on("set:theme", function(value) {
			
			req.flash("success", "Configuration saved");
			res.redirect("/admin/settings");
			
		});
	}
}