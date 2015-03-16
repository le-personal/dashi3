'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var cheerio = require("cheerio");
var request = require("supertest");

describe("Widgets Controller", function() {

	// describe("Post", function() {
	// 	it("Should create a new widget using the route /api/v1/widgets", function(done) {
	//
	// 		var widget = {
	// 			id: new Chance().string({length: 24, pool: pool}),
	// 			type: "counter",
	// 			name: new Chance().sentence(),
	// 			description: new Chance().sentence()
	// 		}
	//
	// 		request.agent(sails.hooks.http.app)
	// 		.post("/api/v1/widgets/")
	// 		.send(widget)
	// 		.expect(201)
	// 		.end(function(err, res) {
	// 			should.not.exist(err);
	// 			res.body.should.be.an.Object;
	// 			res.body.should.have.property("id", widget.id)
	// 			res.body.should.have.property("type", widget.type);
	// 			res.body.should.have.property("name", widget.name);
	// 			res.body.should.have.property("description", widget.description);
	//
	// 			done();
	// 		});
	// 	});
  // });

	describe("Get Widgets", function() {
		it("Should get all widgets available", function(done) {
			request.agent(sails.hooks.http.app)
			.get("/api/v1/widgets/available")
			.expect(200)
			.end(function(err, res) {
				assert.equal(err, null);
				res.body.should.be.an.Array;

				res.body[0].should.have.property("name", "Single Line Graph");
				res.body[0].should.have.property("template", "singlelinegraph");

				res.body[1].should.have.property("name", "Messages");
				res.body[1].should.have.property("template", "messages");

				res.body[2].should.have.property("name", "Counter");
				res.body[2].should.have.property("template", "counter");

				res.body[3].should.have.property("name", "Pie Chart");
				res.body[3].should.have.property("template", "pie");

				res.body[4].should.have.property("name", "Status");
				res.body[4].should.have.property("template", "status");

				res.body[5].should.have.property("name", "Series Graph");
				res.body[5].should.have.property("template", "seriesgraph");

				done();
			});
		});

		it("Should get the widgets of a dashboard", function(done) {
			Factory.create("dashboard", function(dashboard) {
				Factory.create("widgetCounter", {dashboard: dashboard.id}, function(widget) {
					request.agent(sails.hooks.http.app)
					.get("/api/v1/dashboard/"+ dashboard.id +"/widgets")
					.expect(200)
					.end(function(err, res) {
						assert.equal(err, null);
						res.body.should.be.an.Array;
						res.body.should.have.lengthOf(1);
						res.body[0].should.have.property("title", widget.title);

						done();
					});
				});
			});

		});

	});

});
