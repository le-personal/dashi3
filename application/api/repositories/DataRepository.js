var _ = require("lodash");

function DataRepository() {


}

DataRepository.prototype._validate = function(data, callback) {
	if(_.isEmpty(data.valuetype)) {
		return callback("Please specify a type", false);
	}

	return callback(false);
}

DataRepository.prototype.create = function(data, callback) {
	var self = this;
	// check if the data.valuetype is defined
	self._validate(data, function(err) {
		if(err) return callback(err, false);

		switch(data.valuetype) {
			case "number":
				return self.createNumber(data, callback);
			break;

			case "float":
				return self.createFloat(data, callback);
			break;

			case "messages":
				return self.createMessage(data, callback);
			break;
		}
	});

}

DataRepository.prototype.get = function(type, id, callback) {
	var self = this;

	if(_.first(["number", "float", "messages"], type)) {
		switch(type) {
			case "number":
				return self.getNumber(id, callback);
			break;

			case "float":
				return self.getFloat(id, callback);
			break;

			case "messages":
				return self.getMessage(id, callback);
			break;
		}
	}
	
	return callback("Please provide a valid type", false);
}

/**
 * Create a record in the datanumber table
 * @param  {object}   data     An object with the properties defined in the model
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.createNumber = function(data, callback) {
	Datanumber.create(data)
	.exec(function createRecord(err, result) {
		if(err) return callback(err, false);
		if(result) {
			Datanumber.publishCreate(result);
			return callback(false, result);
		}
		return callback(true, false);
	});
}

/**
 * Get a record from the datanumber table
 * @param  {integer}   id       The id to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getNumber = function(id, callback) {
	Datanumber.findOne({id: id})
	.exec(function getRecord(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

/**
 * Create a record in the datafloat table
 * @param  {object}   data     An object with the properties defined in the model
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.createFloat = function(data, callback) {
	Datafloat.create(data)
	.exec(function createRecord(err, result) {
		if(err) return callback(err, false);
		if(result) {
			Datafloat.publishCreate(result);
			return callback(false, result);
		}
		return callback(true, false);
	});
}

/**
 * Get a record from the datafloat table
 * @param  {integer}   id       The id to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getFloat = function(id, callback) {
	Datafloat.findOne({id: id})
	.exec(function getRecord(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

/**
 * Create a record in the datamessages table
 * @param  {object}   data     An object with the properties defined in the model
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.createMessage = function(data, callback) {
	Datamessages.create(data)
	.exec(function createRecord(err, result) {
		if(err) return callback(err, false);
		if(result) {
			Datamessages.publishCreate(result);
			return callback(false, result);
		}
		return callback(true, false);
	});
}

/**
 * Get a record from the datamessages table
 * @param  {integer}   id       The id to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getMessage = function(id, callback) {
	Datamessages.findOne({id: id})
	.exec(function getRecord(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

module.exports = DataRepository;