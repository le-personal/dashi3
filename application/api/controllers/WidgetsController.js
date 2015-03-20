var include = require("include");
var WidgetsRepository = include("api/repositories/WidgetsRepository");

/**
 * WidgetsController
 *
 * @description :: Server-side logic for managing widgets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getWidgets: function getDashboardAPIWidgets(req, res) {
		var id = req.param("id");
		new WidgetsRepository().getWidgets(id, function(err, widgets) {
			if(err) return res.notFound();
			Widgets.subscribe(req.socket, widgets);
			return res.jsonp(200, widgets);
		});
	}
};

