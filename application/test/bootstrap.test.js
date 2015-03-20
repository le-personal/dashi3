/**
 * @file
 * hooks to run before and after tests
 * it does not need to define a module.exports since
 * mocha will run the hooks just by requiring the file
 */

'use strict';

var Sails = require("sails");
var async = require("async");

// Define all methods, there should be a way of do this automatically
var models = ["dashboard", "data", "passport", "user", "widgets"];

/**
 * Find all records of a model and remove them
 * @param  {string}   model The model to reference in sails.models, it's not an object
 *                          just a string, we'll find the model with that name on sails.models
 */
function findAndRemove(model, next) {
  // sails.models have all models, we take the model being called
  // and find it in sails models.
  var Model = sails.models[model];
  Model.find().exec(function(err, results) {
    if(err) {
      console.log(err);
      return next(err);
    }
    
    // For each of the results, we run a calblack to destroy the result found
    async.each(results, function(result, next) {
      result.destroy(function(err, status) {
        return next();
      })
    }, function(err) {
      if(err) console.log(err);
      return next();
    })
  });
}

/**
 * Util function to clear the database
 * @param  {Function} callback A callback to return when done
 */
function clearDB(callback) {
  // For each model in models, run findAndRemove
  async.concat(models, findAndRemove, function(err, results) {
    if(err) console.log(err);
    return callback(false);
  })
}

/**
 * Run before everything
 * Checks the state of the connection, if is is connected,
 * disconnect and then try again
 */
before(function(done) {
  this.timeout(120000);
  Sails.lift({
    log: {
      level: "error"
    },
    hooks: {
      grunt: false
    }
  }, function(err, sails) {
    if(err) {
      console.log("Error bootstraping");
      console.log(err);
    }

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
 * Before each test is run, we clear the DB
 */
afterEach(function (done) {
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
  (typeof sails != "undefined") ? sails.lower(done) : done();
});