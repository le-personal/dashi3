var include = require("include");
var WidgetsRepository = include("api/repositories/WidgetsRepository");

/**
 * WidgetsController
 *
 * @description :: Server-side logic for managing widgets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	available: function available(req, res) {
		var widgets = new WidgetsRepository();
		widgets.available(function(err, results) {
			if(err) return res.jsonp(406, err);
			return res.jsonp(200, results.widgets);
		})
	},

	getWidgets: function getDashboardAPIWidgets(req, res) {
		var id = req.param("id");
		new WidgetsRepository().getWidgets(id, function(err, widgets) {
			if(err) return res.notFound();
			return res.jsonp(200, widgets);
		});
	}


	
};

