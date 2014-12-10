var fs = require("fs");

function WidgetsRepository() {

}

WidgetsRepository.prototype.available = function(callback) {
	sails.log.info("Dirname is: " + __dirname);
	fs.readFile("widgets.json", function(err, data) {
		if(err) return callback(err, false);
		return callback(false, JSON.parse(data.toString()));
	})
}

module.exports = WidgetsRepository;