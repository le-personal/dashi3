var include = require("include");
var DashboardRepository = include("api/repositories/DashboardRepository");
var WidgetsRepository = include("api/repositories/WidgetsRepository");

/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	main: function main(req, res) {
		// get all dashboards
		DashboardRepository.getAll(function(err, results) {
			if(err) return res.serverError(err);
			return res.view("homepage", {dashboards: results});
		});
	},

	public: function public(req, res) {
		// get all public dashboards
		DashboardRepository.getPublic(function(err, results) {
			if(err) return res.serverError(err);
			return res.view("homepage", {dashboards: results});
		});
	},

	getDashboard: function getDashboard(req, res) {
		var path = req.param("path");
		sails.log("Getting dashboard with path: " + path);

		DashboardRepository.getByPath(path, function(err, dashboard) {

			if(err) {
				console.log(err);
				return res.notFound();
			}

			new WidgetsRepository().getWidgets(dashboard.id, function(err, widgets) {
				if(err) return res.notFound();
				return res.view("dashboard", {dashboard: dashboard, widgets: widgets});
			});
		})
	},

	getDashboardAPI: function getDashboardAPI(req, res) {
		var id = req.param("id");
		sails.log("Getting dashboard with id: " + id);

		DashboardRepository.get(id, function(err, dashboard) {
			if(err) return res.notFound();

			new WidgetsRepository().getWidgets(dashboard.id, function(err, widgets) {
				if(err) return res.notFound();

				var result = dashboard.toObject();
				result.widgets = widgets;
				return res.jsonp(200, result);
			});
		})
	},

	createDashboard: function(req, res) {
		DashboardRepository.save(req.body, function(err, result) {
			if(err) return res.serverError(err);
			if(result) {
				return res.json(201, result);
			}
		})
	}
};

