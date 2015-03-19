'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var request = require("supertest");
var cheerio = require("cheerio");

describe("Marketplace controller", function() {
	it("Should get the widgets available /api/v1/marketplace", function(done) {
		request.agent(sails.hooks.http.app)
		.get("/api/v1/marketplace")
		.expect(200)
		.end(function(err, res) {
			assert.equal(err, null);
      res.body.should.be.an.Array;

      res.body["time"].should.have.property("name", "Time");
      res.body["time"].should.have.property("template", "time");
      res.body["time"].should.have.property("description", "A widget that shows the time and date");
      res.body["time"].should.have.property("image", "time.png");
      res.body["time"].should.have.property("category", "General");

      res.body["status"].should.have.property("name", "Status");
      res.body["status"].should.have.property("template", "status");
      res.body["status"].should.have.property("description", "A widget that shows some status");
      res.body["status"].should.have.property("image", "status.png");
      res.body["status"].should.have.property("category", "General");

      res.body["singlelinegraph"].should.have.property("name", "Single Line Graph");
      res.body["singlelinegraph"].should.have.property("template", "singlelinegraph");
      res.body["singlelinegraph"].should.have.property("description", "A widget that shows a graph with a single line of data");
      res.body["singlelinegraph"].should.have.property("image", "singlelinegraph.png");
      res.body["singlelinegraph"].should.have.property("category", "General");

      res.body["seriesgraph"].should.have.property("name", "Series Graph");
      res.body["seriesgraph"].should.have.property("template", "seriesgraph");
      res.body["seriesgraph"].should.have.property("image", "seriesgraph.png");
      res.body["seriesgraph"].should.have.property("category", "General");

      res.body["messages"].should.have.property("name", "Messages");
      res.body["messages"].should.have.property("template", "messages");
      res.body["messages"].should.have.property("image", "messages.png");
      res.body["messages"].should.have.property("category", "General");

      res.body["counter"].should.have.property("name", "Counter");
      res.body["counter"].should.have.property("template", "counter");
      res.body["counter"].should.have.property("image", "counter.png");
      res.body["counter"].should.have.property("category", "General");

			done();
		});
	});
});
