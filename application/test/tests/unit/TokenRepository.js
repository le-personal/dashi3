'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var async = require("async");
var Token = include("api/repositories/TokenRepository");

describe("TokenRepository", function() {

	describe("Get", function() {
		it("Should get a token", function(done) {
			Factory.create("user", function(user) {
				Factory.create("token", {user: user.id}, function(token) {
					Token.get(token.id, function(err, result) {
						should.not.exist(err);
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("token", token.token);
						result.should.have.property("user");
						done();
					});
				})
			})
		});

		it("Should get a token as a promise", function(done) {
			Factory.create("user", function(user) {
				Factory.create("token", {user: user.id}, function(token) {
					Token.get(token.id)
					.then(function(result) {
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("token", token.token);
						result.should.have.property("user");
						done();
					})
					.fail(function(err) {
						should.not.exist(err);
					});
				})
			})
		});
	});

	describe("All", function() {
		it("Should get all tokens", function(done) {
			Factory.create("user", function(user) {
				async.times(
					5, 
					function(n, next) {	
						Factory.create("token", {user: user.id}, function(token) {
							return next(null, token);
						});
					},
					function(err, tokens) {
						Token.all()
						.then(function(results) {
							results.should.be.an.Array;
							results[0].should.have.property("token");
							done();
						})
						.fail(function(err) {
							should.not.exist(err);
						});
					}
				);
			});
		})
	});

	describe("Save", function() {
		it("Should save a new token", function(done) {
			Factory.create("user", function(user) {
				var name = new Chance().word();
				Token.save(name, user.id, function(err, result) {
					should.not.exist(err);
					result.should.be.an.Object;
					result.should.have.property("token");
					result.should.have.property("user");
					done();
				});
			});
		});

		it("Should fail if the user is not sent", function(done) {
			var name = new Chance().word();
			Token.save(name, null, function(err, result) {
				should.exist(err);
				err.should.be.equal("No valid user");
				should.not.exist(result);
				done();
			});
		});

		it("Should save a new token using a promise", function(done) {
			Factory.create("user", function(user) {
				var name = new Chance().word();
				Token.save(name, user.id)
				.then(function(result) {
					result.should.be.an.Object;
					result.should.have.property("token");
					result.should.have.property("user");
					done();
				})
				.fail(function(err) {
					should.not.exist(err);
				});
			});
		});

		it("Should fail if the user is not sent as a promise", function(done) {
			var name = new Chance().word();
			Token.save(name, null)
			.then(function(result) {
				should.not.exist(result);
			})
			.fail(function(err) {
				should.exist(err);
				err.should.be.equal("No valid user");
				done();
			})
		});

		it("Should fail if the name is not sent", function(done) {
			var name = new Chance().word();
			Factory.create("user", function(user) {
				Token.save(null, user.id, function(err, result) {
					should.exist(err);
					err.should.be.equal("No valid name");
					should.not.exist(result);
					done();
				});
			});
		});

		it("Should fail if the name is not sent as a promise", function(done) {
			var name = new Chance().word();

			Factory.create("user", function(user) {
				Token.save(null, user.id)
				.then(function(result) {
					should.not.exist(result);
				})
				.fail(function(err) {
					should.exist(err);
					err.should.be.equal("No valid name");
					done();
				});
			});

		});
	});

	describe("Remove", function() {});

});

