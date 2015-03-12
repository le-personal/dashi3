/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var include = require("include");
var DataRepository = include("/api/repositories/DataRepository");
var StorageRepository = include("/api/repositories/StorageRepository");

module.exports = {
	index: function index(req, res) {
		// Get the storage first to determine the type
		var storageId = req.param("storage");
		new DataRepository().all(storageId, function(err, results) {
			if(err) return res.notFound();
			Data.subscribe(req.socket);
			return res.jsonp(200, results);
		});	
	},

	get: function get(req, res) {
		var storageId = req.param("storage");
		var dataId = req.param("dataid");
	
		new DataRepository().get(dataId, function(err, result) {
			if(err) return res.notFound();
			return res.jsonp(200, result);
		});
	},

	post: function save(req, res) {
		var storageId = req.param("storage");		
		var data = req.body;
		data.storage = Number(storageId);

		console.log("Inserting data");
		console.log(data);

		new DataRepository().save(data, function(err, result) {
			if(err) console.log(err);
			if(err) return res.notFound();
			return res.jsonp(201, result);
		});
	}
};
