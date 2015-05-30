'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var request = require("supertest");
var cheerio = require("cheerio");


describe("Token controller", function() {
	describe("Get", function() {
		
		// it("Should get a token", function(done) {
		// 	Factory.create("user", function(user) {
		// 		Factory.create("token", {user: user.id}, function(token) {
					
		// 			request.agent(sails.hooks.http.app)
		// 			.get("/api/v1/tokens/" + token.id + "?access_token=mitoken")
		// 			.expect(200)
		// 			.end(function(err, res) {
		// 				assert.equal(err, null);
		// 				res.body.should.be.an.Object;
		// 				res.body.should.have.property("id", token.id);
		// 				res.body.should.have.property("token", token.token);
		// 				res.body.should.have.property("user");
		// 				done();
		// 			});


		// 		})
		// 	});
		// });
	});
});