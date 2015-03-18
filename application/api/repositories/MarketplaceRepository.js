var fs = require("fs");
var path = require("path");

function MarketplaceRepository() {

}

/**
 * Loops throught /views/widgets to get a list of available widgets
 * for each of the widgets it found it will look for the info.json file
 * and read the data from there, forming an array that will be returned
 * @return {[type]} [description]
 */
MarketplaceRepository.prototype.all = function(done) {
	var directory = path.join(__dirname, "../../views/widgets");
	var files = [];

	fs.readdir(directory, function(err, list) {
		if(err) return done(err);

		function walk(element, next) {
			fs.stat(directory + "/" + element, function(err, stats) {
				if(err) return next(err);
				if(stats.isDirectory()) {
					var infoFile = directory + "/" + element + "/info.json";

					fs.exists(infoFile, function(exists) {
						if(exists) {
							fs.readFile(infoFile, "utf8", function(err, file) {
								if(err) next(err);
								if(file) {
									var json = JSON.parse(file);
									files[json.template] = json;
									return next();
								}
							});
						}
						else {
							return next();
						}
					});
				}
			});
		}

		async.eachSeries(list, walk, function(err, results) {
			return done(err, files);
		});

	});
}

module.exports = MarketplaceRepository;