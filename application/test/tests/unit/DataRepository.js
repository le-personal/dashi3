'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var DataRepository = include("api/repositories/DataRepository");

describe("DataRepository", function() {
	describe("Number", function() {

		it("Should create a new data point of type number", function(done) {
			Factory.create("storage", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural(),
					definition: "units"
				}

				new DataRepository().createNumber(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("value", data.value);
					result.should.have.property("definition", data.definition);
					done();
				});

			});
		});

		it("Should return an error when creating a data point and not providing the value", function(done) {
			var storage = {
				name: new Chance().word(),
				type: "number",
				description: new Chance().word()
			}

			Factory.create("storage", storage, function(storageResult) {
				var data = {
					storage: storageResult.id,
					definition: "units",
					value: null
				}

				new DataRepository().createNumber(data, function(err, result) {
					err.should.not.be.false;
					result.should.be.false;
					done();
				});

			});
		});

		it("Should create a new data point of type number and retrieve it", function(done) {
			Factory.create("storage", function(storage) {
				Factory.create("datanumber", {storage: storage.id}, function(number) {
					
					new DataRepository().getNumber(number.id, function(err, result) {
						err.should.be.false;
						result.should.be.an.Object;
						result.should.have.property("storage", number.storage);
						result.should.have.property("value", number.value);
						result.should.have.property("definition", number.definition);
						done();
					});

				});
			});
		});

		it("Should return an error when creating a data point and not providing the storage", function(done) {
				var data = {
					storage: null,
					definition: "units",
					value: 5
				}

				new DataRepository().createNumber(data, function(err, result) {
					err.should.not.be.false;
					result.should.be.false;
					done();
				});
		});

		it("Should return an error when creating a data point and sending a text instead of a number", function(done) {
			Factory.create("storage", function(storage) {
				var data = {
					storage: storage.id,
					definition: "units",
					value: "text"
				}

				new DataRepository().createNumber(data, function(err, result) {
					err.should.not.be.false;
					result.should.be.false;
					done();
				});
			});
		});

	});

});