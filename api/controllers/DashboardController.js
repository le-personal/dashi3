/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function MainController(req, res) {
	res.view("dashboard");
}

module.exports = {
	main: function (req, res) {
		return MainController(req, res)
	}
};

