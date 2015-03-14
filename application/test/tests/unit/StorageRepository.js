'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var StorageRepository = include("api/repositories/StorageRepository");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

describe("StorageRepository", function() {

	describe("Get", function() {

		it("Should get a storage", function(done) {
			Factory.create("storageCounter", function(storage) {
				new StorageRepository().get(storage.id, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;

					result.should.have.property("id", storage.id);
					result.should.have.property("access_token").and.be.a.String;
					result.should.have.property("type", storage.type);
					result.should.have.property("name", storage.name);
					result.should.have.property("description", storage.description);

					done();
				})
			});
		});
	});

	describe("Save", function() {
		it("Should save a storage", function(done) {
			var storage = {
				id: new Chance().string({length: 24, pool: pool}),
				type: "counter",
				name: new Chance().sentence(),
				description: new Chance().sentence()
			}

			new StorageRepository().save(storage, function(err, result) {
				should.not.exist(err);
				result.should.be.an.Object;

				result.should.have.property("id", storage.id);
				result.should.have.property("access_token").and.be.a.String;
				result.should.have.property("type", storage.type);
				result.should.have.property("name", storage.name);
				result.should.have.property("description", storage.description);

				done();
			})
		});

		describe("Access token", function() {
			it("Should get an error when sending an access_token", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence(),
					access_token: "my-fake-access-token"
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("An access token is not required and must not be sent");
					should.not.exist(result);
					done();
				})
			});
		});

		describe("Type", function() {
			it("Should get an error when not sending the type", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The storage type is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when not sending the type", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: undefined,
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The storage type is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when not sending the type", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: null,
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The storage type is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when not sending the type", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: "undefined",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The storage type is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when not sending the type", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: "null",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The storage type is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending an invalid type", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: "invalidtype",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The storage type must be one of the following: message, completion, counter, graph, status, map");
					should.not.exist(result);
					done();
				})
			});
		});

		describe("Id", function() {
			it("Should get an error when not sending the id", function(done) {
				var storage = {
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The id is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending undefined as the id", function(done) {
				var storage = {
					id: undefined,
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The id is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending undefined as the id", function(done) {
				var storage = {
					id: "undefined",
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The id is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending null as the id", function(done) {
				var storage = {
					id: null,
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The id is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending null as the id", function(done) {
				var storage = {
					id: "null",
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The id is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending a number as the id", function(done) {
				var storage = {
					id: 1,
					type: "counter",
					name: new Chance().sentence(),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The id is required and must be a string");
					should.not.exist(result);
					done();
				})
			});
		});

		describe("Name", function() {
			it("Should get an error when not sending the name", function(done) {
				var storage = {
					id: new Chance().string({length: 24, pool: pool}),
					type: "counter",
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The name is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending undefined as the name", function(done) {
				var storage = {
					name: undefined,
					type: "counter",
					id: new Chance().string({length: 24, pool: pool}),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The name is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending undefined as the name", function(done) {
				var storage = {
					name: "undefined",
					type: "counter",
					id: new Chance().string({length: 24, pool: pool}),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The name is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending null as the name", function(done) {
				var storage = {
					name: null,
					type: "counter",
					id: new Chance().string({length: 24, pool: pool}),
					description: new Chance().sentence()
				}

				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The name is required");
					should.not.exist(result);
					done();
				})
			});

			it("Should get an error when sending null as the name", function(done) {
				var storage = {
					name: "null",
					type: "counter",
					id: new Chance().string({length: 24, pool: pool}),
					description: new Chance().sentence()
				}
				new StorageRepository().save(storage, function(err, result) {
					err.should.be.equal("The name is required");
					should.not.exist(result);
					done();
				})
			});
		});

	});

});
