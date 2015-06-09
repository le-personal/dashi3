'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var request = require("supertest");
var cheerio = require("cheerio");

describe("Dashboard controller", function() {
	describe("API", function() {
		// it("Should redirect to public dashboards when user is not logged in");

		it("Should get a dashboard calling the route /api/v1/dashboard/:id", function(done) {
			Factory.create("dashboard", {public: true}, function(dashboard) {
				request.agent(sails.hooks.http.app)
				.get("/api/v1/dashboard/" + dashboard.id)
				.expect(200)
				.end(function(err, res) {
					if(err) console.log(err);
					
					res.statusCode.should.be.equal(200);
					assert.equal(err, null);
					res.body.name.should.be.equal(dashboard.name);
					res.body.path.should.be.equal(dashboard.path);
					res.body.description.should.be.equal(dashboard.description);
					res.body.should.have.property("id");
					done();
				});
			});
		});

			// Dashboard API doesn't work with auth requests yet since we can't login using an API
			// Disabled until implemented
		// it("Should create a new dashboard calling the route /api/v1/dashboard", function(done) {
			// Factory.build("dashboard", function(dashboard) {
			// 	request.agent(sails.hooks.http.app)
			// 	.post("/api/v1/dashboard")
			// 	.send(dashboard)
			// 	.expect(201)
			// 	.end(function(err, res) {
			// 		assert.equal(err, null);
			// 		res.body.name.should.be.equal(dashboard.name);
			// 		res.body.path.should.be.equal(dashboard.path);
			// 		res.body.description.should.be.equal(dashboard.description);
			// 		res.body.should.have.property("id");
			// 		done();
			// 	});
			// });
		// })
		
	});

	describe("Get dashboard", function() {
		// disabled until ACL is working
		// it("Should get a dashboard page", function(done) {
		// 	Factory.create("dashboard", function(dashboard) {
		// 		request.agent(sails.hooks.http.app)
		// 		.get("/d/" + dashboard.path)
		// 		.expect(200)
		// 		.end(function(err, res) {
		// 			assert.equal(null, err);
		// 			done();
		// 		});
		// 	});

		// });

	});

});
