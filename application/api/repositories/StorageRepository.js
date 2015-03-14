'use strict';

var _ = require("lodash");

function StorageRepository() {

}

StorageRepository.prototype.get = function(id, callback) {
	Storage.findOne({id: id})
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

StorageRepository.prototype.validate = function(data) {
	// validation here for all the required properties
	if(!data.id) {
		return "The id is required";
	}

	if(!_.isString(data.id)) {
		return "The id is required and must be a string";
	}

	if(data.id === "undefined" || data.id === "null") {
		return "The id is required";
	}

	if(!data.type) {
		return "The storage type is required";
	}

	if(data.type === "undefined" || data.type === "null") {
		return "The storage type is required";
	}

	var validTypes = [
		"message",
		"completion",
		"counter",
		"graph",
		"status",
		"map"
	]

	if(!_.contains(validTypes, data.type)) {
		return "The storage type must be one of the following: message, completion, counter, graph, status, map";
	}

	if(!data.name) {
		return "The name is required";
	}

	if(data.name === "undefined" || data.name === "null") {
		return "The name is required";
	}

	if(data.access_token) {
		return "An access token is not required and must not be sent";
	}

	return;
}

/**
 * Saves a new storage
 * Data is an object with the properties: id, name, description and type
 */
StorageRepository.prototype.save = function(data, callback) {
	var self = this;
	var error = self.validate(data);

	if(error) {
		return callback(error);
	}
	else {
		// Create new instance of model using data from params
		Storage.create(data)
		.exec(function created (err, newInstance) {

			// Differentiate between waterline-originated validation errors
			// and serious underlying issues. Respond with badRequest if a
			// validation error is encountered, w/ validation info.
			if (err) return callback(err);

			// If we have the pubsub hook, use the model class's publish method
			// to notify all subscribers about the created item
			// if (req._sails.hooks.pubsub) {
			// 	if (req.isSocket) {
			// 		Storage.subscribe(req, newInstance);
			// 		Storage.introduce(newInstance);
			// 	}
			// 	Storage.publishCreate(newInstance, !req.options.mirror && req);
			// }

			return callback(err, newInstance);
		});
	}
}

module.exports = StorageRepository;
