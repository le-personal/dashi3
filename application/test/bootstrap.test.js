/**
 * @file
 * hooks to run before and after tests
 * it does not need to define a module.exports since
 * mocha will run the hooks just by requiring the file
 */

'use strict';

var Sails = require("sails");
var async = require("async");

Array.prototype.asyncEach = function(iterator) {  
  var list    = this,
      n       = list.length,
      i       = -1,
      calls   = 0,
      looping = false;

  var iterate = function() {
    calls -= 1;
    i += 1;
    if (i === n) return;
    iterator(list[i], resume);
  };

  var loop = function() {
    if (looping) return;
    looping = true;
    while (calls > 0) iterate();
    looping = false;
  };

  var resume = function() {
    calls += 1;
    if (typeof setTimeout === 'undefined') loop();
    else setTimeout(iterate, 1);
  };
  resume();
};

// Define all methods, there should be a way of do this automatically
var models = ["dashboard", "data", "passport", "user", "widgets", "token"];

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

    var total = results.length;
    var counter = 0;
    
    if(total == counter) return next();

    // For each of the results, we run a calblack to destroy the result found
    results.asyncEach(function(item, resume) {
      item.destroy(function(err, status) {
        counter++;

        if(counter < total) {
          resume();
        }
        else {
          return next();
        }
      })
    });

    
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