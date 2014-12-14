function DataRepository() {

}

DataRepository.prototype.create = function(data, callback) {

}

DataRepository.prototype.get = function(type, id, callback) {

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

module.exports = DataRepository;