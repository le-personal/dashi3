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

			// if the result is added as a second argument, it doesn't work
			Data.subscribe(req.socket);
			return res.jsonp(200, result);
		});
	},

	getOne: function getOne(req, res) {
		var id = req.params.id;

		DataRepository.get(id)
		.then(function(result) {
			return res.jsonp(200, result);
		})
		.fail(function(err) {
			return res.notFound();
		})
	},

	remove: function remove(req, res) {
		var id = req.params.id;

		DataRepository.remove(id)
		.then(function() {
			return res.jsonp(200, true);
		})
		.fail(function(err) {
			return res.notFound();
		})
	},

	post: function save(req, res) {
		var dataset = req.params.dataset;
		var content = req.body;
		var access_token = req.query.access_token;

		if(req.headers["content-type"] != "application/json") {
			return res.serverError("The server only accepts JSON content, please set the headers to Content-Type: application/json");
		}

		DataRepository.save(access_token, dataset, content)
		.then(function(result) {
			Data.publishCreate(result);
			return res.jsonp(201, result);
		})
		.fail(function(err) {
			return res.serverError(err);
		});
	}
};
