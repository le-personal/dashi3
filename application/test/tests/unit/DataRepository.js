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
			Factory.create("storageNumber", function(storage) {
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

			Factory.create("storageNumber", storage, function(storageResult) {
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
			Factory.create("storageNumber", function(storage) {
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
			Factory.create("storageNumber", function(storage) {
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

	/************************************
	 * ================================
	 * ================================
	 * ================================
	 * DATAFLOAT
	 * ================================
	 * ================================
	 * ================================
	 */
	describe("Float", function() {
		it("Should create a new data point of type float", function(done) {
			Factory.create("storageFloat", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().floating({fixed: 2, min: 0, max: 100}),
					definition: "units"
				}

				new DataRepository().createFloat(data, function(err, result) {
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
				type: "float",
				description: new Chance().word()
			}

			Factory.create("storageFloat", storage, function(storageResult) {
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

		it("Should create a new data point of type float and retrieve it", function(done) {
			Factory.create("storageFloat", function(storage) {
				Factory.create("datafloat", {storage: storage.id}, function(number) {
					new DataRepository().getFloat(number.id, function(err, result) {
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

			new DataRepository().createFloat(data, function(err, result) {
				err.should.not.be.false;
				result.should.be.false;
				done();
			});
		});

		it("Should return an error when creating a data point and sending a text instead of a number", function(done) {
			Factory.create("storageFloat", function(storage) {
				var data = {
					storage: storage.id,
					definition: "units",
					value: "text"
				}

				new DataRepository().createFloat(data, function(err, result) {
					err.should.not.be.false;
					result.should.be.false;
					done();
				});
			});
		});

	});

	/************************************
	 * ================================
	 * ================================
	 * ================================
	 * DATAMESSAGES
	 * ================================
	 * ================================
	 * ================================
	 */

	describe("Messages", function() {

		it("Should create a new data point of type messages", function(done) {
			Factory.create("storageMessages", function(storage) {
				var data = {
					storage: storage.id,
					message: new Chance().sentence({words: 5}),
					type: "info"
				}

				new DataRepository().createMessage(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("message", data.message);
					result.should.have.property("type", data.type);
					done();
				});
			});
		});

		it("Should return an error when creating a data point and not providing the message", function(done) {
			Factory.create("storageMessages", function(storage) {
				var data = {
					storage: storage.id,
					message: null,
					type: "info"
				}

				new DataRepository().createMessage(data, function(err, result) {
					err.should.not.be.false;
					result.should.be.false;
					done();
				});
			});
		});

		it("Should return an error when creating a data point and not providing the type", function(done) {
			Factory.create("storageMessages", function(storage) {
				var data = {
					storage: storage.id,
					message: new Chance().sentence({words: 5}),
					type: null
				}

				new DataRepository().createMessage(data, function(err, result) {
					err.should.not.be.false;
					result.should.be.false;
					done();
				});
			});
		});

		it("Should create a new data point of type message and retrieve it", function(done) {
			Factory.create("storageMessages", function(storage) {
				Factory.create("datamessages", {storage: storage.id}, function(message) {
					new DataRepository().getMessage(message.id, function(err, result) {
						err.should.be.false;
						result.should.be.an.Object;
						result.should.have.property("storage", message.storage);
						result.should.have.property("message", message.message);
						result.should.have.property("type", message.type);
						done();
					});
				});
			});
		});

		it("Should return an error when creating a data point and not providing the storage", function(done) {
			var data = {
				storage: null,
				message: new Chance().sentence({words: 5}),
				type: "info"
			}

			new DataRepository().createMessage(data, function(err, result) {
				err.should.not.be.false;
				result.should.be.false;
				done();
			});
		});
	});

	/************************************
	 * ================================
	 * ================================
	 * ================================
	 * GENERAL METHODS
	 * ================================
	 * ================================
	 * ================================
	 */
	describe("General methods", function() {

		it("Should fail calling the create method when not sending the valuetype", function(done) {
			Factory.create("storageNumber", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural(),
					definition: "units",
				}

				new DataRepository().create(data, function(err, result) {
					err.should.be.equal("Please specify a type");
					result.should.be.false;
					done();
				});
			});
		});

		it("Should create a new data number by calling create method", function(done) {
			Factory.create("storageNumber", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural(),
					definition: "units",
					valuetype: "number"
				}

				new DataRepository().create(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("value", data.value);
					result.should.have.property("definition", data.definition);
					done();
				});
			});
		});

		it("Should create a new data float by calling create method", function(done) {
			Factory.create("storageFloat", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().floating({fixed: 2, min: 0, max: 100}),
					definition: "units",
					valuetype: "float"
				}

				new DataRepository().create(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("value", data.value);
					result.should.have.property("definition", data.definition);
					done();
				});
			});
		});

		it("Should create a new data message by calling the create method", function(done) {
			Factory.create("storageMessages", function(storage) {
				var data = {
					storage: storage.id,
					message: new Chance().sentence({words: 5}),
					type: "info",
					valuetype: "message"
				}

				new DataRepository().create(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("message", data.message);
					result.should.have.property("type", data.type);
					done();
				});
			});
		});

		it("Should create a new data number and then retrieve it by calling the get method", function(done) {
			Factory.create("storageNumber", function(storage) {
				Factory.create("datanumber", {storage: storage.id}, function(number) {
					new DataRepository().get("number", number.id, function(err, result) {
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

		it("Should create a new data float and then retrieve it by calling the get method", function(done) {
			Factory.create("storageFloat", function(storage) {
				Factory.create("datafloat", {storage: storage.id}, function(number) {
					new DataRepository().get("float", number.id, function(err, result) {
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

		it("Should create a new data message and then retrieve it by calling the get method", function(done) {
			Factory.create("storageMessages", function(storage) {
				Factory.create("datamessages", {storage: storage.id}, function(message) {
					new DataRepository().get("messages", message.id, function(err, result) {
						err.should.be.false;
						result.should.be.an.Object;
						result.should.have.property("storage", message.storage);
						result.should.have.property("message", message.message);
						result.should.have.property("type", message.type);
						done();
					});
				});
			});
		});

		it("Should try to get a non existing type when calling get", function(done) {
			new DataRepository().get("abc", 1, function(err, result) {
				err.should.be.equal("Please provide a valid type");
				result.should.be.false;
				done();
			})
		});

	

	});

	/************************************
	 * ================================
	 * ================================
	 * ================================
	 * GET ALL
	 * ================================
	 * ================================
	 * ================================
	 */
	describe("Get all", function() {

		it("Should get all data of type number using getAllNumbers", function(done) {
			Factory.create("storageNumber", function(storage) {
				async.times(30, function(n, next) {
					Factory.create("datanumber", {storage: storage.id}, function(dataNumber) {
						return next(false, dataNumber);
					});
				}, function(err, data) {
					new DataRepository().getAllNumbers(storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});

		it("Should get all data of type float using getAllFloats", function(done) {
			Factory.create("storageNumber", function(storage) {
				async.times(30, function(n, next) {
					Factory.create("datafloat", {storage: storage.id}, function(dataFloat) {
						return next(false, dataFloat);
					});
				}, function(err, data) {
					new DataRepository().getAllFloats(storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});

		it("Should get all data of type message using getAllMessages", function(done) {
			Factory.create("storageMessages", function(storage) {
				async.times(30, function(n, next) {
					Factory.create("datamessages", {storage: storage.id}, function(dataMessage) {
						return next(false, dataMessage);
					});
				}, function(err, data) {
					new DataRepository().getAllMessages(storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});


	});

	/************************************
	 * ================================
	 * ================================
	 * ================================
	 * GET ALL OF TYPE
	 * ================================
	 * ================================
	 * ================================
	 */
	describe("getAllOfType", function() {
		it("Shold call getAllOfType and get an error when sending a wrong type", function(done) {
			new DataRepository().getAllOfType("abc", 1, function(err, results) {
				err.should.be.equal("Please provide a valid type");
				results.should.be.false;
				done();
			});
		});

		it("Should get all data of type number using getAllOfType", function(done) {
			Factory.create("storageNumber", function(storage) {
				async.times(26, function(n, next) {
					Factory.create("datanumber", {storage: storage.id}, function(dataNumber) {
						return next(false, dataNumber);
					});
				}, function(err, data) {
					new DataRepository().getAllOfType("number", storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});

		it("Should get all data of type float using getAllOfType", function(done) {
			Factory.create("storageFloat", function(storage) {
				async.times(26, function(n, next) {
					Factory.create("datafloat", {storage: storage.id}, function(dataFloat) {
						return next(false, dataFloat);
					});
				}, function(err, data) {
					new DataRepository().getAllOfType("float", storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});

		it("Should get all data of type message using getAllOfType", function(done) {
			Factory.create("storageMessages", function(storage) {
				async.times(26, function(n, next) {
					Factory.create("datamessages", {storage: storage.id}, function(dataMessage) {
						return next(false, dataMessage);
					});
				}, function(err, data) {
					new DataRepository().getAllOfType("message", storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});

	});

});