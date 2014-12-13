var fs = require("fs");
var _ = require("lodash");

function WidgetsRepository() {

}

WidgetsRepository.prototype.available = function(callback) {
	sails.log.info("Dirname is: " + __dirname);
	fs.readFile("widgets.json", function(err, data) {
		if(err) return callback(err, false);
		return callback(false, JSON.parse(data.toString()));
	});
}

WidgetsRepository.prototype.getWidgets = function(dashboardId, callback) {
	Widgets.find({where: {dashboard: dashboardId}})
	.exec(function(err, results) {
		if(err) return callback(err, false);
		return callback(false, results);
	});
}

module.exports = WidgetsRepository;