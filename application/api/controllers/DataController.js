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
		var query = req.param("query");
		
		DataRepository.index(query)
		.then(function(results) {
			return res.jsonp(200, results);
		})
		.fail(function(err) {
			return res.notFound(err);
		});
	},

	get: function get(req, res) {
		var dataset = req.params.dataset;

		DataRepository.all(dataset, function(err, result) {
			if(err) return res.notFound();
			return res.jsonp(200, result);
		});
	},

	post: function save(req, res) {
		var dataset = req.params.dataset;
		var content = req.body;
		var access_token = req.query.access_token;

		DataRepository.save(access_token, dataset, content)
		.then(function(result) {
			return res.jsonp(201, result);
		})
		.fail(function(err) {
			return res.serverError(err);
		});
	}
};
