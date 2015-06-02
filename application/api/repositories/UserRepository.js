var _ = require("lodash");
var async = require("async");
var Q = require("q");

var Repository = {}

/**
 * Check if a user is admin or not
 * @param  {string}   id   The id of the user
 * @param  {Function} next An optional callback to return
 * @return {Boolean}       The result of the isAdmin attribute
 */
Repository.isAdmin = function isAdmin(id, next) {
	var d = Q.defer();

	User.findOne({id: id})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result.isAdmin);
		}
	})

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Get a user
 * @param  {string}   id   The id of the user to get
 * @param  {Function} next An optional callback to return when done
 * @return {Promise}        A promise
 */
Repository.get = function get(id, next) {
	var d = Q.defer();

	User.findOne({id: id})
	.populate("passports")
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

module.exports = Repository;