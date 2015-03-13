var _ = require("lodash");
var StorageRepository = require("./StorageRepository");

function DataRepository() {


}

/**
 * Validate callback
 * @param  {object}   data     The data object to validate
 *                             Only the valuetype is validated here since is the only
 *                             object we need to validate, this is because the rest of the data
 *                             is validated by Waterfall when hitting the database and "valuetype"
 *                             is the only property it's not saved in the database and it's only
 *                             purpose is to determine the table to save the data on
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */


/**
 * Create a new data record
 * @param  {object}   data     An object with the following properties:
 *                             - valuetype: {string} the type of data we're creating
 *                             - value: for the cases of number and float
 *                             - definition: for the cases of number and float
 *                             - storage: the id of the storage
 *                             - message: for the case of messages we need to send the string with the message
 *                             - type: for the case of messages we need to specify a type
 *                             				only info, error and success are allowed
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.save = function(data, callback) {
	var self = this;

	new StorageRepository().get(data.storage, function(err, storage) {
		if(err) return callback(err, false);

		switch(storage.type) {
			case "counter":
				return self.saveCounter(data, callback);
			break;

			case "graph":
				return self.saveGraph(data, callback);
			break;

			case "status":
				return self.saveStatus(data, callback);
			break;

			case "map":
				return self.saveMap(data, callback);
			break;

			case "completion":
				return self.saveCompletion(data, callback);
			break;

			case "message":
				return self.saveMessage(data, callback);
			break;
		}
	});
}

/**
 * Get one data record of the given type
 * @param  {string}   type     The type of record to get
 * @param  {integer}   id       The id of the record to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.get = function(id, callback) {
	var self = this;

	Data.findOne({id: id})
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

/**
 * Get all data of a storage
 * ordered by created DESC
 */
DataRepository.prototype.all = function(storageId, callback) {
	Data.find({storage: storageId})
	.limit(25)
	.sort("createdAt DESC")
	.exec(function(err, results) {
		if(err) return callback(err, false);
		if(results) return callback(false, results);
		return callback(true, false);
	});
}

/**
 * Saves a data point of type counter
 */
DataRepository.prototype.saveCounter = function(data, callback) {
	function validate(data) {
		var error = false;

		if(!_.isNumber(data.value)) {
			error = "A value is required";
		}

		if(!_.isString(data.storage)) {
			error = "A storage is required";
		}

		return error;
	}

	var error = validate(data)
	if(error) {
		return callback(error);
	}
	else {
		var input = {
			value: data.value,
			storage: data.storage
		}

		Data.create(input)
		.exec(function createRecord(err, result) {
			if(err) return callback(err, false);
			if(result) {
				Data.publishCreate(result);
				return callback(false, result);
			}
			return callback(true, false);
		});
	}
}

/**
 * Saves a data point as a graph
 */
DataRepository.prototype.saveGraph = function(data, callback) {
	function validate(data) {
		var error = false;

		if(!_.isNumber(data.value)) {
			error = "A value is required";
		}

		if(!_.isString(data.storage)) {
			error = "A storage is required";
		}

		return error;
	}

	var error = validate(data)
	if(error) {
		return callback(error);
	}
	else {
		var input = {
			value: data.value,
			storage: data.storage
		}

		Data.create(input)
		.exec(function createRecord(err, result) {
			if(err) return callback(err, false);
			if(result) {
				Data.publishCreate(result);
				return callback(false, result);
			}
			return callback(true, false);
		});
	}
}

/**
 * Saves a data point as a status
 */
DataRepository.prototype.saveStatus = function(data, callback) {
	function validate(data) {
		var error = false;

		if(!_.isString(data.storage)) {
			error = "A storage is required";
		}

		if(!_.contains(["ok", "error", "warning"], data.value)) {
			error = "The status is invalid";
		}

		return error;
	}

	var error = validate(data)
	if(error) {
		return callback(error);
	}
	else {
		var input = {
			value: data.value,
			storage: data.storage
		}

		Data.create(input)
		.exec(function createRecord(err, result) {
			if(err) return callback(err, false);
			if(result) {
				Data.publishCreate(result);
				return callback(false, result);
			}
			return callback(true, false);
		});
	}
}

/**
 * Saves a data point as a status
 */
DataRepository.prototype.saveMap = function(data, callback) {
	function validate(data) {
		var error = false;

		if(!_.isString(data.storage)) {
			error = "A storage is required";
		}

		if(!_.isNumber(data.value.longitude)) {
			error = "A longitude is required";
		}

		if(!_.isNumber(data.value.latitude)) {
			error = "A latitude is required";
		}

		if(!_.isNumber(data.value.value)) {
			error = "A value is required";
		}

		return error;
	}

	var error = validate(data)
	if(error) {
		return callback(error);
	}
	else {
		var input = {
			value: {
				value: data.value.value,
				longitude: data.value.longitude,
				latitude: data.value.latitude
			},
			storage: data.storage
		}

		Data.create(input)
		.exec(function createRecord(err, result) {
			if(err) return callback(err, false);
			if(result) {
				Data.publishCreate(result);
				return callback(false, result);
			}
			return callback(true, false);
		});
	}
}


/**
 * Saves a data point as a status
 */
DataRepository.prototype.saveCompletion = function(data, callback) {
	function validate(data) {
		var error = false;

		if(!_.isString(data.storage)) {
			error = "A storage is required";
		}

		if(!_.isNumber(data.value.min)) {
			error = "The minimum value is required";
		}

		if(!_.isNumber(data.value.max)) {
			error = "The maximum value is required";
		}

		if(!_.isNumber(data.value.current)) {
			error = "The current value is required";
		}

		if(data.value.max < data.value.min) {
			error = "The maximum value must be bigger than the minimum value";
		}

		if(data.value.max == data.value.min) {
			error = "The maximum value and minimum value cannot be equal";
		}

		return error;
	}

	var error = validate(data)
	if(error) {
		return callback(error);
	}
	else {
		var input = {
			value: {
				current: data.value.current,
				max: data.value.max,
				min: data.value.min
			},
			storage: data.storage
		}

		Data.create(input)
		.exec(function createRecord(err, result) {
			if(err) return callback(err, false);
			if(result) {
				Data.publishCreate(result);
				return callback(false, result);
			}
			return callback(true, false);
		});
	}
}

/**
 * Saves a data point of type message
 */
DataRepository.prototype.saveMessage = function(data, callback) {
	function validate(data) {
		var error = false;

		if(!_.isString(data.storage)) {
			error = "A storage is required";
		}

		if(!_.isString(data.value.title)) {
			error = "The title is required";
		}

		if(!_.isString(data.value.content)) {
			error = "The content of the message is required";
		}

		return error;
	}

	var error = validate(data)
	if(error) {
		return callback(error);
	}
	else {
		var input = {
			value: {
				title: data.value.title,
				content: data.value.content,
				image: data.value.image ? data.value.image : null,
				link: data.value.link ? data.value.link : null
			},
			storage: data.storage
		}

		Data.create(input)
		.exec(function createRecord(err, result) {
			if(err) return callback(err, false);
			if(result) {
				Data.publishCreate(result);
				return callback(false, result);
			}
			return callback(true, false);
		});
	}
}

module.exports = DataRepository;
