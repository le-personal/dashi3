var Q = require("q");

/**
 * Dashboard Class
 */
var DashboardRepository = {}

/**
 * Get all dashboards
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.getAll = function(callback) {
	Dashboard.find().exec(function(err, results) {
		if(err) return callback(err);
		return callback(false, results);
	});
}

DashboardRepository.getPublic = function(callback) {
	Dashboard.find({public: true}).exec(function(err, results) {
		if(err) return callback(err);
		return callback(false, results);
	})
}

/**
 * Get a dashboard by path
 * @param  {string}   path     The path to use to retrieve the dashboard
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.getByPath = function(path, next) {
	var d = Q.defer();

	if(!path) d.reject("No valid path");

	Dashboard.findOne({path: path})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Get a dashboard given the id
 * @param  {integer|string}   id       The id to get
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.get = function(id, next) {
	var d = Q.defer();

	if(!id) d.reject("No valid id");

	Dashboard.findOne({id: id})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Saves a dashboard to the database
 * @param  {object}   data     An object with the properties name, path and description
 * @param  {Function} callback A callback to execute when done
 * @return {Function}            The callback passed in the argument callback
 */
DashboardRepository.save = function(data, next) {
	var d = Q.defer();

	if(!data.name) d.reject("No valid name");
	if(!data.path) d.reject("No valid path, enter another one");

	Dashboard.create(data)
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});
	
	d.promise.nodeify(next);
	return d.promise;
}

DashboardRepository.remove = function(id, next) {
	var d = Q.defer();
	if(!id) d.reject("No id");

	Dashboard.destroy({id: id})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	})

	d.promise.nodeify(next);
	return d.promise;
}

module.exports = DashboardRepository;