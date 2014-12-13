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

module.exports = Factory;