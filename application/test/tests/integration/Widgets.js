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
	
	describe("Get Widgets", function() {
		it("Should get all widgets available", function(done) {
			request.agent(sails.hooks.http.app)
			.get("/api/v1/widgets/available")
			.expect(200)
			.end(function(err, res) {
				assert.equal(err, null);
				res.body.should.be.an.Array;

				res.body[0].should.have.property("name", "Line Chart");
				res.body[0].should.have.property("template", "line");

				res.body[1].should.have.property("name", "Messages");
				res.body[1].should.have.property("template", "messages");

				res.body[2].should.have.property("name", "Number");
				res.body[2].should.have.property("template", "number");

				res.body[3].should.have.property("name", "Pie Chart");
				res.body[3].should.have.property("template", "pie");

				done();
			});
		});

		it("Should get the widgets of a dashboard", function(done) {
			Factory.create("dashboard", function(dashboard) {
				Factory.create("storageNumber", function(storage) {
					Factory.create("widget", {dashboard: dashboard.id, storage: storage.id}, function(widget) {
						
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

});