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

	fs.readdir(directory, function(err, list) {
		if(err) return done(err);
		function walk(element, next) {
			fs.stat(directory + "/" + element, function(err, stats) {
				if(err) return next();
				if(stats.isDirectory()) {
					var infoFile = directory + "/" + element + "/info.json";

					fs.exists(infoFile, function(exists) {
						if(exists) {
							fs.readFile(infoFile, "utf8", function(err, file) {
								if(err) next(null);
								if(file) {
									var json = JSON.parse(file);
									return next(null, json);
								}
							});
						}
						else {
							return next(null);
						}
					});
				}
				else {
					return next(null);
				}
			});
		}

		async.concat(list, walk, function(err, results) {
			if(err) console.log(err);
			return done(err, results);
		});

	});
}

module.exports = MarketplaceRepository;
