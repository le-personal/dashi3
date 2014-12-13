/**
 * @file
 * hooks to run before and after tests
 * it does not need to define a module.exports since
 * mocha will run the hooks just by requiring the file
 */

'use strict';

var Sails = require("sails");
var app;
var async = require("async");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.MYSQL_PORT_3306_TCP_ADDR,
    user: process.env.MYSQL_ENV_MYSQL_USER,
    password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
    database: process.env.MYSQL_ENV_MYSQL_DATABASE,
    port: process.env.MYSQL_PORT_3306_TCP_PORT,
});

// Tables to remove
var tables = [
  "dashboard",
  "data",
  "datafloat",
  "datamessages",
  "datanumber",
  "sources",
  "widgets"
];

/**
 * Util function to clear the database
 * @param  {Function} callback A callback to return when done
 */
function clearDB(callback) {
  connection.connect(function(err) {
    async.each(tables, function(table, next) {
      connection.query("TRUNCATE TABLE " + table, function(err, rows2) {
        return next(err);
      });
    }, function(err) {
      if(err) console.log(err);
      return callback(false);
    });
  });
}

/**
 * Run before everything
 * Checks the state of the connection, if is is connected,
 * disconnect and then try again
 */
before(function(done) {
  this.timeout(15000);
  Sails.lift({
    log: {
      level: "error"
    }
  }, function(err, sails) {
    if(err) {
      console.log("Error bootstraping");
      console.log(err);
    }  

    app = sails;    
    done(err, sails);
  });
});

/**
 * Before each test is run, we clear the DB
 */
beforeEach(function (done) {
  clearDB(function() {
    done();
  });
});

/**
 * After all tests are done, disconnect
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
after(function (done) {
  app.lower(done);
});

