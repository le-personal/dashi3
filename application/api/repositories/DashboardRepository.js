function DashboardRepository() {

}

DashboardRepository.prototype.getAll = function(callback) {
	Dashboard.find().exec(function(err, results) {
		if(err) return callback(err);
		return callback(false, results);
	});
}

DashboardRepository.prototype.getByPath = function(path, callback) {
	Dashboard.findOne({path: path})
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	})
}

DashboardRepository.prototype.get = function(id, callback) {
	Dashboard.findOne({id: id})
	.exec(function(err, result) {
		if(err) return callback(err, false);
		if(result) return callback(false, result);
		return callback(true, false);
	})	
}

module.exports = DashboardRepository;