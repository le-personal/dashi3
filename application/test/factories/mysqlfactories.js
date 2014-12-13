/**
 * @file Factory definition for Dashboard
 */

var Chance = require("chance");
var Factory = require("factory-mysql-fixtures");
var connection = {
    host: process.env.MYSQL_PORT_3306_TCP_ADDR,
    user: process.env.MYSQL_ENV_MYSQL_USER,
    password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
    database: process.env.MYSQL_ENV_MYSQL_DATABASE,
    port: process.env.MYSQL_PORT_3306_TCP_PORT,
};

Factory.config(connection);

Factory.define("dashboard", {
	name: new Chance().word(),
	description: new Chance().string(),
	path: new Chance().word()
});

Factory.define("storageNumber", {
	name: new Chance().word(),
	type: "number",
	description: new Chance().word()
});

Factory.define("storageMessages", {
  name: new Chance().word(),
  type: "messages",
  description: new Chance().word()
});

Factory.define("storageFloat", {
  name: new Chance().word(),
  type: "float",
  description: new Chance().word()
});

Factory.define("datafloat", {
	storage: Factory.assoc("storageFloat", "id"),
	value: new Chance().floating({fixed: 4}),
	definition: "units"
});

Factory.define("datanumber", {
	storage: Factory.assoc("storageNumber", "id"),
	value: new Chance().natural(),
	definition: "units"
});

Factory.define("datamessages", {
	storage: Factory.assoc("storageMessages", "id"),
	message: new Chance().sentence({words: 5}),
	type: "info"
});

module.exports = Factory;