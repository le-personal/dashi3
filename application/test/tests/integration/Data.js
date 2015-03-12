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
		it("Should get all data from a storage using the route /api/v1/storage/:storage/data", function(done) {
			Factory.create("storageCounter", function(storage) {
				async.times(30, function(n, next) {
					Factory.create("dataCounter", {storage: storage.id}, function(data) {
						next(false, data);
					});
				}, function(err, data) {
					request.agent(sails.hooks.http.app)
					.get("/api/v1/storage/"+ storage.id +"/data")
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

		it("Should get a single data record from a storage using the route /api/v1/storage/:storage/data/:dataid", function(done) {
			Factory.create("storageCounter", function(storage) {
				Factory.create("dataCounter", {storage: storage.id}, function(data) {
					request.agent(sails.hooks.http.app)
					.get("/api/v1/storage/" + storage.id + "/data/" + data.id)
					.expect(200)
					.end(function(err, res) {
						assert.equal(err, null);
						res.body.should.be.an.Object;
						res.body.should.have.property("value", data.value);
						res.body.should.have.property("storage", data.storage);
						done();
					});
				});
			});
		});

		it("Should post a data record of type counter using the route /api/v1/storage/:storage/data", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					value: 25
				}

				request.agent(sails.hooks.http.app)
				.post("/api/v1/storage/" + storage.id + "/data")
				.expect(201)
				.send(data)
				.end(function(err, res) {
					console.log(err);
					// assert.equal(err, false);
					res.body.should.be.an.Object;
					res.body.should.have.property("id");
					res.body.should.have.property("storage", storage.id);
					res.body.should.have.property("value", data.value);
					done();
				}); 
			});
		});

	});

});