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
var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

describe("Storage Controller", function() {
	describe("Post", function() {
		it("Should create a new storage using the route /api/v1/storage", function(done) {

			var storage = {
				id: new Chance().string({length: 24, pool: pool}),
				type: "counter",
				name: new Chance().sentence(),
				description: new Chance().sentence()
			}

			request.agent(sails.hooks.http.app)
			.post("/api/v1/storage/")
			.send(storage)
			.expect(201)
			.end(function(err, res) {
				should.not.exist(err);
				res.body.should.be.an.Object;
				res.body.should.have.property("id", storage.id)
				res.body.should.have.property("type", storage.type);
				res.body.should.have.property("name", storage.name);
				res.body.should.have.property("access_token");
				res.body.should.have.property("description", storage.description);

				done();
			});
		});
  });
});
