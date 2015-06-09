var _ = require("lodash");
var async = require("async");
var Q = require("q");
var include = require("include");
var ApplicationRepository = include("api/repositories/ApplicationRepository");

var Repository = {}

/**
 * Get a dataset point
 * @param  {string}   id   The id of the dataset to get
 * @param  {Function} next An optional callback to execute
 * @return {Promise}        A promise
 */
Repository.get = function get(id, next) {
	var d = Q.defer();

	Data.findOne({id: id})
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
 * Save a new dataset
 * @param  {string}   token   The token to use to get the application
 * @param  {string}   dataset A string to represent the dataset
 * @param  {object}   content An object to represent the content, it can be a string or a number but it is recommended to use it as a content
 * @param  {Function} next    The optional callback to execute when done
 * @return {Promise}           A promise
 */
Repository.save = function save(token, dataset, content, next) {
	var d = Q.defer();

	if(!token) d.reject("No valid token");
	if(!dataset) d.reject("A dataset is needed");
	if(!content) d.reject("No content");

	ApplicationRepository.getByToken(token)
	.then(function(application) {
		var data = {
			application: application.id,
			dataset: dataset,
			content: content
		}

		Data.create(data)
		.exec(function(err, result) {
			if(err) d.reject(err);
			else {
				d.resolve(result);
			}
		});
	})
	.fail(function(err) {
		d.reject(err);
	});

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Get all datasets
 * @param  {string}   dataset The name of the datasets
 * @param  {Function} next    [description]
 * @return {[type]}           [description]
 */
Repository.all = function(dataset, next) {
	var d = Q.defer();

	if(!dataset) d.reject("No valid dataset");

	Data.find({dataset: dataset})
	.limit(25)
	.sort("createdAt DESC")
	.exec(function(err, results) {
		if(err) d.reject(err);
		else {
			d.resolve(results);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

Repository.index = function index(query, next) {
	var d = Q.defer();

	if(!query) d.reject("No valid query");

	Data.find({
		dataset: { 'contains': query }
	}, {fields: ['id', 'dataset']})
	.limit(1)
	.exec(function(err, results) {
		if(err) d.reject(err);
		else {
			d.resolve(results);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

Repository.remove = function remove(id, next) {
	var d = Q.defer();

	if(!id) d.reject("No id provided");
	Data.destroy({
		id: id
	})
	.exec(function(err) {
		if(err) d.reject(err);
		else {
			d.resolve();
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

module.exports = Repository;