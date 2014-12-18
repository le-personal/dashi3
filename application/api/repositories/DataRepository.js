var _ = require("lodash");

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
DataRepository.prototype._validate = function(data, callback) {
	if(_.isEmpty(data.valuetype)) {
		return callback("Please specify a type", false);
	}

	return callback(false);
}

/**
 * Create a new data record
 * @param  {object}   data     An object with the following properties:
 *                             - valuetype: {string} the type of data we're creating
 *                             - value: for the cases of number and float
 *                             - definition: for the cases of number and float
 *                             - storage: the id of the storage
 *                             - message: for the case of messages we need to send the string with the message
 *                             - type: for the case of messages we need to specify a type
 *                             				only info, danger and success are allowed
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
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

/**
 * Get all records of a given type and a storage
 * @param  {string}   type     The storage type to get from, this is important because we are
 *                             getting all records and we need to determine in what table to search 
 * @param  {integer}   storageId  The id of the storage to get from, it is not possible to get all data
 *                              of a given type without the storage because there's no case when we'll need
 *                              to have mixed data from multiple storages into one query
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getAllOfType = function(type, storageId, callback) {
	var self = this;

	if(_.first(["number", "float", "messages"], type)) {
		switch(type) {
			case "number":
				return self.getAllNumbers(storageId, callback);
			break;

			case "float":
				return self.getAllFloats(storageId, callback);
			break;

			case "messages":
				return self.getAllMessages(storageId, callback);
			break;
		}
	}
	
	return callback("Please provide a valid type", false);
}

/**
 * Get one data record of the given type
 * @param  {string}   type     The type of record to get
 * @param  {integer}   id       The id of the record to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
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
 * Get all data of a storage from the table datanumbers
 * @param 	{integer} storage	The id of the storage to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getAllNumbers = function(storage, callback) {
	Datanumber.find({storage: storage})
	.limit(25)
	.sort("createdAt DESC")
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
 * Get all data of a storage from the table datanumbers
 * @param 	{integer} storage	The id of the storage to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getAllFloats = function(storage, callback) {
	Datafloat.find({storage: storage})
	.limit(25)
	.sort("createdAt DESC")
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

/**
 * Get all data of a storage from the table datamessages
 * @param 	{integer} storage	The id of the storage to get
 * @param  {Function} callback The function to return when done
 * @return {Function}            The callback to execute when done
 */
DataRepository.prototype.getAllMessages = function(storage, callback) {
	Datamessages.find({storage: storage})
	.limit(25)
	.sort("createdAt DESC")
	.exec(function getRecord(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});	
}


module.exports = DataRepository;