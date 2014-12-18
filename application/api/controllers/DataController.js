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
		new StorageRepository().get(storageId, function(err, storage) {
			if(err) return res.notFound();

			new DataRepository().getAllOfType(storage.type, storage.id, function(err, results) {
				if(err) return res.notFound();

				switch(storage.type) {
					case "number":
						Datanumber.subscribe(req.socket);
						Datanumber.subscribe(req.socket, results);
						break;

					case "float":
						Datafloat.subscribe(req.socket);
						Datafloat.subscribe(req.socket, results);
						break;

					case "messages":
						Datamessages.subscribe(req.socket);
						Datamessages.subscribe(req.socket, results);
						break;
				}

				return res.jsonp(200, results);
			});	
		});
	},

	get: function get(req, res) {
		var storageId = req.param("storage");
		var dataId = req.param("dataid");
		new StorageRepository().get(storageId, function(err, storage) {
			if(err) return res.notFound();

			new DataRepository().get(storage.type, dataId, function(err, result) {
				if(err) return res.notFound();
				return res.jsonp(200, result);
			});
		});
	},

	post: function save(req, res) {
		var storageId = req.param("storage");

		new StorageRepository().get(storageId, function(err, storage) {
			if(err) return err.notFound();

			var data = req.body;
			data.storage = storageId;
			data.valuetype = storage.type;

			new DataRepository().create(data, function(err, result) {
				if(err) return res.notFound();
				return res.jsonp(201, result);
			});
		});
	}
};
