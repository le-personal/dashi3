var include = require("include");
var DashboardRepository = include("api/repositories/DashboardRepository");
var WidgetsRepository = include("api/repositories/WidgetsRepository");

/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function main(req, res) {
	// get all dashboards
	new DashboardRepository().getAll(function(err, results) {
		if(err) return res.serverError(err);
		return res.view("homepage", {dashboards: results});
	});
}

function getDashboard(req, res) {
	var path = req.param("path");
	sails.log("Getting dashboard with path: " + path);

	new DashboardRepository().getByPath(path, function(err, dashboard) {
		if(err) return res.notFound();

		new WidgetsRepository().getWidgets(dashboard.id, function(err, widgets) {
			if(err) return res.notFound();
			return res.view("dashboard", {dashboard: dashboard, widgets: widgets});
		});
	})
}

function getDashboardAPI(req, res) {
	var id = req.param("id");
	sails.log("Getting dashboard with id: " + id);

	new DashboardRepository().get(id, function(err, dashboard) {
		if(err) return res.notFound();

		new WidgetsRepository().getWidgets(dashboard.id, function(err, widgets) {
			if(err) return res.notFound();

			var result = dashboard.toObject();
			result.widgets = widgets;
			return res.jsonp(200, result);
		});
	})
}

function getDashboardAPIWidgets(req, res) {
	var id = req.param("id");
	new WidgetsRepository().getWidgets(id, function(err, widgets) {
		if(err) return res.notFound();
		return res.jsonp(200, widgets);
	});
}

module.exports = {
	main: function (req, res) {
		return main(req, res)
	},

	getDashboard: function(req, res) {
		return getDashboard(req, res);
	},

	getWidgets: function(req, res) {
		return getWidgets(req, res);
	},

	getDashboardAPI: function(req, res) {
		return getDashboardAPI(req, res);
	}
};

