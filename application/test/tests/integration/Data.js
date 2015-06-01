'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var cheerio = require("cheerio");
var request = require("supertest");
var async = require("async");

describe("Data Controller", function() {
	describe("Get", function() {
		it("Should get all data from a dataset /api/v1/data/:dataset", function(done) {
			var dataset = "my-thing";
			async.times(
				5,
				function(item, next) {
					Factory.create("dataJSON", {dataset: dataset}, function(data) {
						return next(null, data);
					});
				},
				function(err, results) {
					request.agent(sails.hooks.http.app)
					.get("/api/v1/data/" + dataset)
					.expect(200)
					.end(function(err, res) {
						res.body.should.be.an.Array.with.lengthOf(5);
						done();
					});
				}
			);
		});
	});

	describe("Save", function() {
		it("Should save a dataset", function(done) {
			var dataset = "my-thing";
			Factory.create("application", function(application) {
				Factory.build("dataValue", function(data) {					
					request.agent(sails.hooks.http.app)
					.post("/api/v1/data/" + dataset + "?access_token=" + application.token)
					.send(data.content)
					.expect(201)
					.end(function(err, res) {
						res.body.should.be.an.Object;
						res.body.should.have.property("dataset", dataset);
						res.body.should.have.property("application", application.id);
						res.body.should.have.property("content");
						res.body.content.should.have.property("value", data.content.value);
						done();
					})
				});

			})
		});




	});

});

