'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap");
var Factory = include("test/factories/Dashboard");
var Chance = require("chance");
var request = require("supertest");

describe("Dashboard controller", function() {
	describe("Get a dashboard", function() {

		it("Should get a dashboard by path calling the route /api/v1/dashboard/:id", function(done) {
			var data = {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			Factory.create("dashboard", data, function(err, id) {
				request.agent(sails.hooks.http.app)
				.get("/api/v1/dashboard/" + id)
				.expect(200)
				.end(function(err, res) {
					assert.equal(err, null);
					res.body.name.should.be.equal(data.name);
					res.body.path.should.be.equal(data.path);
					res.body.description.should.be.equal(data.description);
					res.body.should.have.property("id");
					done();
				});
			});
		});
		
	})
});
