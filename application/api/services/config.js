var Config = require("config-persistence");
var db = sails.config.session.settings_db;
var options = {
	port: sails.config.session.port,
	host: sails.config.session.host,
}

module.exports = new Config(db, options);