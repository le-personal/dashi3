'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var DataRepository = include("api/repositories/DataRepository");

describe("DataRepository", function() {
	describe("dataJSON", function() {	
		it("Should get a dataJSON", function(done) {
			Factory.create("dataJSON", function(data) {
				DataRepository.get(data.id)
				.then(function(result) {
					result.should.be.an.Object;
					result.should.have.property("id", data.id);
					result.should.have.property("dataset", data.dataset);
					result.should.have.property("application"); 
					result.should.have.property("content").and.should.be.an.Object.with.property("title", data.content.title);
					result.should.have.property("content").with.property("content", data.content.content);
					result.should.have.property("content").with.property("image", data.content.image);
					result.should.have.property("content").with.property("link", data.content.link);
				})
				.catch(function(err) {
					should.not.exist(err);
				})
				.fin(done);
			});
		});

		it("Should save a new dataJSON", function(done) {
			Factory.create("application", function(application) {
				Factory.build("dataJSON", function(data) {
					delete data.application;
					
					DataRepository.save(application.token, data.dataset, data.content, function(err, result) {
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("dataset", data.dataset);
						result.should.have.property("application");
						result.should.have.property("content")

						result.content.should.be.an.Object.with.property("title", data.content.title);
						result.content.should.be.an.Object.with.property("content", data.content.content);
						result.content.should.be.an.Object.with.property("image", data.content.image);
						result.content.should.be.an.Object.with.property("link", data.content.link);
												
						should.not.exist(err);
						done();
					});
				});
			});
		});

		it("Should save a new dataJSON as a promise", function(done) {
			Factory.create("application", function(application) {
				Factory.build("dataJSON", function(data) {
					delete data.application;
					
					DataRepository.save(application.token, data.dataset, data.content)
					.then(function(result) {
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("dataset", data.dataset);
						result.should.have.property("application");
						result.should.have.property("content")

						result.content.should.be.an.Object.with.property("title", data.content.title);
						result.content.should.be.an.Object.with.property("content", data.content.content);
						result.content.should.be.an.Object.with.property("image", data.content.image);
						result.content.should.be.an.Object.with.property("link", data.content.link);
												
						done();
					})
					.fail(function(err) {
						should.not.exist(err);
					})
				});
			});
		});		
	});

	describe("dataValue", function() {
		it("Should get a data value", function(done) {
			Factory.create("application", function(application) {
				Factory.create("dataValue", {application: application.id, dataset: "test-dataset"}, function(data) {
					DataRepository.get(data.id, function(err, result) {
						result.should.be.an.Object;
						result.should.have.property("id", data.id);
						result.should.have.property("dataset", data.dataset);
						result.should.have.property("application");
						result.should.have.property("content").and.should.be.an.Object
						result.content.should.have.property("value", data.content.value);
						should.not.exist(err);
						done();
					});
				});
			})
		});
	});

	describe("Error messages", function() {
		it("Should save a data location and fail when not sending a token", function(done) {
			Factory.build("dataLocation", function(data) {
				DataRepository.save(null)
				.then(function(result) {
					should.not.exist(result);
					done();
				})
				.fail(function(err) {
					err.should.be.equal("No valid token");
					done();
				});
			});
		});

		it("Should save a data location and fail when not sending a dataset", function(done) {
			Factory.build("application", function(application) {
				Factory.build("dataLocation", function(data) {
					DataRepository.save(application.token, null, {value: "hello"})
					.then(function(result) {
					})
					.fail(function(err) {
						err.should.be.equal("A dataset is needed");
						done();
					});
				});
			})
		});

		it("Should save a data location and fail when not sending content", function(done) {
			Factory.build("application", function(application) {
				Factory.build("dataLocation", function(data) {
					DataRepository.save(application.token, "test-dataset", null)
					.then(function(result) {
					})
					.fail(function(err) {
						err.should.be.equal("No content");
						done();
					});
				});
			})
		});
	});

	describe("Get all", function() {
		it("Should get all data from a dataset", function(done) {
			var dataset = "my-supercool-dataset";
			async.times(
				5,
				function(item, next) {
					Factory.create("dataJSON", {dataset: dataset}, function(data) {
						return next(false, data);
					});
				},
				function(err, results) {
					DataRepository.all(dataset)
					.then(function(results) {
						results.should.be.an.Array.with.lengthOf(5);
						results[0].should.be.an.Object.with.property("dataset", data.dataset).and.property("content");
					})
					.fail(function(err) {
						should.not.exist(err);
					})
					.fin(done);
				}
			);
		});
	});

});
