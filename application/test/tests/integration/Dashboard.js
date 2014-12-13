'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap");
var Factory = include("test/factories/mysqlfactories");
var Chance = require("chance");
var request = require("supertest");
var cheerio = require("cheerio");

describe("Dashboard controller", function() {
	describe("API", function() {

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

		// it("Should get the widgets", function(done) {
		// 	request.agent(sails.hooks.http.app)
		// 	.get("/api/v1/widgets/available")
		// 	.expect(200)
		// 	.end(function(err, res) {
		// 		assert.equal(err, null);
		// 		res.body.widgets.should.be.an.Array;

		// 		res.body.widgets[0].should.have.property("name", "Line Chart");
		// 		res.body.widgets[0].should.have.property("template", "line");

		// 		res.body.widgets[1].should.have.property("name", "Messages");
		// 		res.body.widgets[1].should.have.property("template", "messages");

		// 		res.body.widgets[2].should.have.property("name", "Number");
		// 		res.body.widgets[2].should.have.property("template", "number");

		// 		res.body.widgets[3].should.have.property("name", "Pie Chart");
		// 		res.body.widgets[3].should.have.property("template", "pie");

		// 		done();
		// 	});
		// });
		
	});

	describe("Get dashboard", function() {
		
		it("Should get a dashboard page", function(done) {
			var data = {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			Factory.create("dashboard", data, function(err, id) {
				request.agent(sails.hooks.http.app)
				.get("/dashboard/" + data.path)
				.expect(200)
				.end(function(err, res) {
					assert.equal(null, err);
					done();
				});
			});

		});

		it("Should get all dashboard pages", function(done) {
			var data = {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			Factory.create("dashboard", data, function(err, id) {
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
