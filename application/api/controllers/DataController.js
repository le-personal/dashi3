/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var include = require("include");
var DataRepository = include("/api/repositories/DataRepository");

module.exports = {
	index: function index(req, res) {
		// Get the storage first to determine the type
		var widgetId = req.param("widget");

		new DataRepository().all(widgetId, function(err, results) {
			if(err) return res.notFound();
			if(results) {
				Data.subscribe(req.socket);
				return res.jsonp(200, results);
			}
		});
	},

	get: function get(req, res) {
		var dataId = req.param("dataid");

		new DataRepository().get(dataId, function(err, result) {
			if(err) return res.notFound();
			return res.jsonp(200, result);
		});
	},

	post: function save(req, res) {
		var data = req.body;
		var widgetId = req.param("widget");

		data.widget = widgetId;

		new DataRepository().save(data, function(err, result) {
			if(err) console.log(err);
			if(err) return res.badRequest(err);
			return res.jsonp(201, result);
		});

	}
};
