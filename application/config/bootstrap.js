/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var Config = require("config-persistence");

module.exports.bootstrap = function(cb) {
	var db = sails.config.session.settings_db;
	var options = {
		port: sails.config.session.port,
		host: sails.config.session.host,
	}

	var config = new Config(db, options);

	console.log(sails.config.settings);
	config.init(sails.config.settings);
	config.on("initialized", function() {
	  sails.services.passport.loadStrategies();
	  // It's very important to trigger this callback method when you are finished
	  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
	  cb();
	})
	
};
