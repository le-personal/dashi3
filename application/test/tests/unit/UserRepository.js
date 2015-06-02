'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var UserRepository = include("api/repositories/UserRepository");

describe("UserRepository", function() {
	describe("Is admin", function() {
		it("Should check that a user is not an admin", function(done) {
			Factory.create("user", function(user) {
				UserRepository.isAdmin(user.id)
				.then(function(result) {
					result.should.be.equal(false);
					done();
				})
				.fail(function(err) {

				});
			});
		});

		it("Should check that a user is an admin", function(done) {
			Factory.create("user", {isAdmin: true}, function(user) {
				UserRepository.isAdmin(user.id)
				.then(function(result) {
					result.should.be.equal(true);
					done();
				})
				.fail(function(err) {

				});
			});
		});
	});
});