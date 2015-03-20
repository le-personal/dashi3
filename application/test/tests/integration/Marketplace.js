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

			res.body.should.containEql({
				category: 'General',
				description: 'A widget that shows the time and date',
				image: 'time.png',
				name: 'Time',
				template: 'time'
			});

			res.body.should.containEql({
				name: 'Single Line Graph',
				description: 'A widget that shows a graph with a single line of data',
				category: 'General',
				template: 'singlelinegraph',
				image: 'singlelinegraph.png'
			});

			res.body.should.containEql({
				name: 'Counter',
				description: 'A widget that shows a counter',
				category: 'General',
				template: 'counter',
				image: 'counter.png'
			});

			res.body.should.containEql({
				name: 'Status',
				description: 'A widget that shows some status',
				category: 'General',
				template: 'status',
				image: 'status.png'
			});

			res.body.should.containEql({
				name: 'Messages',
				description: 'A widget that shows a stream of messages',
				category: 'General',
				template: 'messages',
				image: 'messages.png'
			});

			res.body.should.containEql({
				name: 'Series Graph',
				description: 'A widget that shows a graph with a multiple line of data',
				category: 'General',
				template: 'seriesgraph',
				image: 'seriesgraph.png'
			});

			done();
		});
	});
});
