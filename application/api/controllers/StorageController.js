/**
 * StorageController
 *
 * @description :: Server-side logic for managing storages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var include = require("include");
var StorageRepository = include("/api/repositories/StorageRepository");

module.exports = {
	post: function(req, res) {
		var data = req.body;

		new StorageRepository().save(data, function(err, result) {
			if(err) return res.notFound();
			return res.jsonp(201, result);
		});
	}
};
