/**
 * Dashboard Class
 */
function DashboardRepository() {

}

/**
 * Get all dashboards
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.prototype.getAll = function(callback) {
	Dashboard.find().exec(function(err, results) {
		if(err) return callback(err);
		return callback(false, results);
	});
}

/**
 * Get a dashboard by path
 * @param  {string}   path     The path to use to retrieve the dashboard
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.prototype.getByPath = function(path, callback) {
	Dashboard.findOne({path: path})
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

/**
 * Get a dashboard given the id
 * @param  {integer|string}   id       The id to get
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.prototype.get = function(id, callback) {
	Dashboard.findOne({id: id})
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

/**
 * Saves a dashboard to the database
 * @param  {object}   data     An object with the properties name, path and description
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.prototype.save = function(data, callback) {
	Dashboard.create(data)
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	});
}

module.exports = DashboardRepository;