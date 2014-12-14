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

		it("Should get a dashboard by path calling the route /api/v1/dashboard/:id", function(done) {
			Factory.create("dashboard", function(dashboard) {
				request.agent(sails.hooks.http.app)
				.get("/api/v1/dashboard/" + dashboard.id)
				.expect(200)
				.end(function(err, res) {
					assert.equal(err, null);
					res.body.name.should.be.equal(dashboard.name);
					res.body.path.should.be.equal(dashboard.path);
					res.body.description.should.be.equal(dashboard.description);
					res.body.should.have.property("id");
					done();
				});
			});
		});
		
	});

	describe("Get dashboard", function() {
		
		it("Should get a dashboard page", function(done) {
			Factory.create("dashboard", function(dashboard) {
				request.agent(sails.hooks.http.app)
				.get("/dashboard/" + dashboard.path)
				.expect(200)
				.end(function(err, res) {
					assert.equal(null, err);
					done();
				});
			});

		});

		it("Should get all dashboard pages", function(done) {
			Factory.create("dashboard", function(dashboard) {
				request.agent(sails.hooks.http.app)
				.get("/")
				.expect(200)
				.end(function(err, res) {
					assert.equal(null, err);
					var dom = res.text;

					var $ = cheerio.load(dom);
					var title = $("h1").text();
					title.should.equal("Dashboards");

					done();
				});
			});

		});

	});

});
