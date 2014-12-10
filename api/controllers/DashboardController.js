var include = require("include");
var DashboardRepository = include("api/repositories/DashboardRepository");

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
		return res.view("dashboard", {dashboard: dashboard});
	})

}

module.exports = {
	main: function (req, res) {
		return main(req, res)
	},

	getDashboard: function(req, res) {
		return getDashboard(req, res);
	}
};

