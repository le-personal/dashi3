'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
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
					})
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

	describe("All", function() {});
	describe("Save", function() {});	
	describe("Remove", function() {});

});

