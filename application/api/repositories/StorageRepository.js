'use strict';

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

module.exports = StorageRepository;
