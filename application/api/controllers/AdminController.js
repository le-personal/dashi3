
var _ = require("lodash");

module.exports = {
	getSettings: function getSettings(req, res) {
		config.all()
		.then(function(results) {
			res.locals.layout = "admin/layout";
			res.view("admin/settings/settings", {config: results});
		})
		.fail(function(err) {
			return res.serverError(err);
		})
	},

	postSettings: function postSettings(req, res) {
		var settings = {
			theme: req.body.theme,
			widget_size: req.body.widget_size
		};
		
		config.mset(settings);
		config.on("mset", function(values) {
			req.flash("success", "Configuration saved");
			res.redirect("/admin/settings");
		});
	},

	provider: function (req, res) {
		console.log("Should I set an action here?");
    passport.endpoint(req, res);
  },
}