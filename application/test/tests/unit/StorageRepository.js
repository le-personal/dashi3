'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var StorageRepository = include("api/repositories/StorageRepository");
var Factory = require("sails-factory").load();
var Chance = require("chance");

describe("StorageRepository", function() {

	describe("Get", function() {

		it("Should get a storage", function(done) {
			Factory.create("storageCounter", function(storage) {
				new StorageRepository().get(storage.id, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;

					result.should.have.property("id", storage.id);
					result.should.have.property("type", storage.type);
					result.should.have.property("name", storage.name);
					result.should.have.property("description", storage.description);

					done();
				})
			});
		});

	});

});