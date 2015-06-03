var Config = require("config-persistence");
var _ = require("lodash");

var db = sails.config.session.settings_db;
var options = {
	port: sails.config.session.port,
	host: sails.config.session.host,
}

module.exports = {
	getSettings: function getSettings(req, res) {
		var client = new Config(db, options);

		client.all()
		.then(function(results) {
			res.locals.layout = "admin/layout";
			res.view("admin/settings/settings", {config: results});
		})
		.fail(function(err) {
			return res.serverError(err);
		})
	},

	postSettings: function postSettings(req, res) {
		var client = new Config(db, options);

		var settings = {
			theme: req.body.theme,
			widget_size: req.body.widget_size
		};
		
		client.mset(settings);
		client.on("mset", function(values) {
			req.flash("success", "Configuration saved");
			res.redirect("/admin/settings");
		});
	},

	provider: function (req, res) {
		console.log("Should I set an action here?");
    passport.endpoint(req, res);
  },
}