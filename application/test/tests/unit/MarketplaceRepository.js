'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var MarketplaceRepository = include("api/repositories/MarketplaceRepository");
var Factory = require("sails-factory").load();
var Chance = require("chance");

describe("MarketplaceRepository", function() {
	describe("Get all widgets", function() {
		it("Should get all widgets by looking in the info.json file of every widget", function(done) {
			new MarketplaceRepository().all(function(err, result) {
				should.not.exist(err);
				result.should.be.an.Array;

				result["time"].should.have.property("name", "Time");
				result["time"].should.have.property("template", "time");
				result["time"].should.have.property("description", "A widget that shows the time and date");
				result["time"].should.have.property("image", "time.png");
				result["time"].should.have.property("category", "General");

				result["status"].should.have.property("name", "Status");
				result["status"].should.have.property("template", "status");
				result["status"].should.have.property("description", "A widget that shows some status");
				result["status"].should.have.property("image", "status.png");
				result["status"].should.have.property("category", "General");

				result["singlelinegraph"].should.have.property("name", "Single Line Graph");
				result["singlelinegraph"].should.have.property("template", "singlelinegraph");
				result["singlelinegraph"].should.have.property("description", "A widget that shows a graph with a single line of data");
				result["singlelinegraph"].should.have.property("image", "singlelinegraph.png");
				result["singlelinegraph"].should.have.property("category", "General");

				result["seriesgraph"].should.have.property("name", "Series Graph");
				result["seriesgraph"].should.have.property("template", "seriesgraph");
				result["seriesgraph"].should.have.property("image", "seriesgraph.png");
				result["seriesgraph"].should.have.property("category", "General");

				result["messages"].should.have.property("name", "Messages");
				result["messages"].should.have.property("template", "messages");
				result["messages"].should.have.property("image", "messages.png");
				result["messages"].should.have.property("category", "General");

				result["counter"].should.have.property("name", "Counter");
				result["counter"].should.have.property("template", "counter");
				result["counter"].should.have.property("image", "counter.png");
				result["counter"].should.have.property("category", "General");

				done();
			});
		});
	});
});
