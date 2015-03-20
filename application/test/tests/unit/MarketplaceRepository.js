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

				result.should.containEql({
				  category: 'General',
				  description: 'A widget that shows the time and date',
				  image: 'time.png',
				  name: 'Time',
				  template: 'time'
				});

				result.should.containEql({
					name: 'Single Line Graph',
			    description: 'A widget that shows a graph with a single line of data',
			    category: 'General',
			    template: 'singlelinegraph',
			    image: 'singlelinegraph.png'
				});

				result.should.containEql({
					name: 'Counter',
			    description: 'A widget that shows a counter',
			    category: 'General',
			    template: 'counter',
			    image: 'counter.png'
				});

				result.should.containEql({
					name: 'Status',
			    description: 'A widget that shows some status',
			    category: 'General',
			    template: 'status',
			    image: 'status.png'
				});

				result.should.containEql({
					name: 'Messages',
			    description: 'A widget that shows a stream of messages',
			    category: 'General',
			    template: 'messages',
			    image: 'messages.png'
				});

				result.should.containEql({
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
});
