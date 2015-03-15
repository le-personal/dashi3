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
		it("Should get all data from a widget using the route /api/v1/widgets/:widget/data", function(done) {
			Factory.create("widgetCounter", function(widget) {
				async.times(30, function(n, next) {
					Factory.create("dataCounter", {widget: widget.id}, function(data) {
						next(false, data);
					});
				}, function(err, data) {
					request.agent(sails.hooks.http.app)
					.get("/api/v1/widgets/"+ widget.id +"/data?access_token=" + widget.access_token)
					.expect(200)
					.end(function(err, res) {
						assert.equal(err, null);
						res.body.should.be.an.Array;
						res.body.should.have.lengthOf(25);
						res.body[0].should.have.property("value", data[0].value);
						done();
					});
				});
			});
		});

		it("Should get a single data record from a widget using the route /api/v1/widgets/:widget/data/:dataid", function(done) {
			Factory.create("widgetCounter", function(widget) {
				Factory.create("dataCounter", {widget: widget.id}, function(data) {
					request.agent(sails.hooks.http.app)
					.get("/api/v1/widgets/" + widget.id + "/data/" + data.id + "?access_token=" + widget.access_token)
					.expect(200)
					.end(function(err, res) {
						assert.equal(err, null);
						res.body.should.be.an.Object;
						res.body.should.have.property("value", data.value);
						res.body.should.have.property("widget", data.widget);
						done();
					});
				});
			});
		});

		it("Should post a data record of type counter using the route /api/v1/widgets/:widget/data", function(done) {
			Factory.create("widgetCounter", function(widget) {
				var data = {
					value: 25
				}

				request.agent(sails.hooks.http.app)
				.post("/api/v1/widgets/" + widget.id + "/data?access_token=" + widget.access_token)
				.expect(201)
				.send(data)
				.end(function(err, res) {
					// assert.equal(err, false);
					res.body.should.be.an.Object;
					res.body.should.have.property("id");
					res.body.should.have.property("widget", widget.id);
					res.body.should.have.property("value", data.value);
					done();
				});
			});
		});

		// it("Should get an error when not sending the access_token", function(done) {
		// 	Factory.create("widgetCounter", function(widget) {
		// 		var data = {
		// 			value: 25
		// 		}
		//
		// 		request.agent(sails.hooks.http.app)
		// 		.post("/api/v1/widgets/" + widget.id + "/data")
		// 		.expect(403)
		// 		.send(data)
		// 		.end(function(err, res) {
		// 			res.statusCode.should.be.equal(403);
		// 			res.status.should.be.equal(403);
		// 			res.error.text.should.be.equal("An access token is required");
		// 			done();
		// 		});
		// 	});
		// });
		//
		// it("Should get an error when sending an invalid access_token", function(done) {
		// 	Factory.create("widgetCounter", function(widget) {
		// 		var data = {
		// 			value: 25
		// 		}
		//
		// 		request.agent(sails.hooks.http.app)
		// 		.post("/api/v1/widgets/" + widget.id + "/data?access_token=myinvalidtoken")
		// 		.expect(403)
		// 		.send(data)
		// 		.end(function(err, res) {
		// 			res.statusCode.should.be.equal(403);
		// 			res.status.should.be.equal(403);
		// 			res.error.text.should.be.equal("The access token is invalid");
		// 			done();
		// 		});
		// 	});
		// });

	});

});
