var Q = require("q");

var TokenRepository = {}

TokenRepository.all = function all() {

}

/**
 * Get a new token
 * @param  {string} The id of the token to find
 * @param  {Function} An optional callback to return
 * @return {promise} A promise unless it's used a callback
 */
TokenRepository.get = function get(id, next) {
	var d = Q.defer();

	Token.findOne({id: id})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

TokenRepository.save = function save() {

}

TokenRepository.remove = function remove() {

}

module.exports = TokenRepository;