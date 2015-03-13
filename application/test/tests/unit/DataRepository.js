'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var DataRepository = include("api/repositories/DataRepository");

describe("DataRepository", function() {

	////////////////////////////
	////// COUNTER
	////////////////////////////
	describe("DataCounter", function() {
		it("Should create a new data point of type counter", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural({min: 10, max: 100}),
				}

				new DataRepository().saveCounter(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("value", data.value);
					done();
				});
			})
		});

		it("Should return an error when not providing the value", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					storage: storage.id,
				}

				new DataRepository().saveCounter(data, function(err, result) {
					err.should.be.equal("A value is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the storage", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					value: new Chance().natural({min: 10, max: 100}),
				}

				new DataRepository().saveCounter(data, function(err, result) {
					err.should.be.equal("A storage is required");
					should.not.exist(result);
					done();
				});
			})
		});
	});

	////////////////////////////
	////// GRAPH
	////////////////////////////
	describe("DataGraph", function() {
		it("Should create a new data point of type graph", function(done) {
			Factory.create("storageGraph", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural({min: 10, max: 100}),
				}

				new DataRepository().saveGraph(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("value", data.value);
					done();
				});
			})
		});

		it("Should return an error when not providing the value", function(done) {
			Factory.create("storageGraph", function(storage) {
				var data = {
					storage: storage.id,
				}

				new DataRepository().saveGraph(data, function(err, result) {
					err.should.be.equal("A value is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the storage", function(done) {
			Factory.create("storageGraph", function(storage) {
				var data = {
					value: new Chance().natural({min: 10, max: 100}),
				}

				new DataRepository().saveGraph(data, function(err, result) {
					err.should.be.equal("A storage is required");
					should.not.exist(result);
					done();
				});
			})
		});
	});

	////////////////////////////
	////// STATUS
	////////////////////////////
	describe("DataStatus", function() {
		it("Should create a new data point of type status", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					storage: storage.id,
					value: "ok",
				}

				new DataRepository().saveStatus(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.should.have.property("value", data.value);
					done();
				});
			})
		});

		it("Should return an error when not providing the value", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					storage: storage.id,
				}

				new DataRepository().saveStatus(data, function(err, result) {
					err.should.be.equal("The status is invalid");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the storage", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					value: "error"
				}

				new DataRepository().saveStatus(data, function(err, result) {
					err.should.be.equal("A storage is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when providing a non valid status", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					storage: storage.id,
					value: "other"
				}

				new DataRepository().saveStatus(data, function(err, result) {
					err.should.be.equal("The status is invalid");
					should.not.exist(result);
					done();
				});
			})
		});
	});

	////////////////////////////
	////// MAP
	////////////////////////////

	describe("DataMap", function() {
		it("Should create a new data point of type graph", function(done) {
			Factory.create("storageMap", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						value: new Chance().natural({min: 10, max: 100}),
						latitude: new Chance().latitude(),
						longitude: new Chance().longitude()
					}
				}

				new DataRepository().saveMap(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.value.should.be.an.Object;
					result.should.have.property("value");
					result.value.should.have.property("value", data.value.value);
					result.value.should.have.property("latitude", data.value.latitude);
					result.value.should.have.property("longitude", data.value.longitude);
					done();
				});
			})
		});

		it("Should return an error when not providing the value", function(done) {
			Factory.create("storageMap", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						latitude: new Chance().latitude(),
						longitude: new Chance().longitude()
					}
				}

				new DataRepository().saveMap(data, function(err, result) {
					err.should.be.equal("A value is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the storage", function(done) {
			Factory.create("storageMap", function(storage) {
				var data = {
					value: {
						value: new Chance().natural({min: 10, max: 100}),
						latitude: new Chance().latitude(),
						longitude: new Chance().longitude()
					}
				}

				new DataRepository().saveMap(data, function(err, result) {
					err.should.be.equal("A storage is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the latitude", function(done) {
			Factory.create("storageMap", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						value: new Chance().natural({min: 10, max: 100}),
						longitude: new Chance().longitude()
					}
				}

				new DataRepository().saveMap(data, function(err, result) {
					err.should.be.equal("A latitude is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the longitude", function(done) {
			Factory.create("storageMap", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						value: new Chance().natural({min: 10, max: 100}),
						latitude: new Chance().latitude()
					}
				}

				new DataRepository().saveMap(data, function(err, result) {
					err.should.be.equal("A longitude is required");
					should.not.exist(result);
					done();
				});
			})
		});
	});

	////////////////////////////
	////// COMPLETION
	////////////////////////////
	describe("DataCompletion", function() {
		it("Should create a new data point of type completion", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						min: 0,
						max: 100
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.value.should.be.an.Object;
					result.should.have.property("value");
					result.value.should.have.property("current", data.value.current);
					result.value.should.have.property("max", data.value.max);
					result.value.should.have.property("min", data.value.min);
					done();
				});
			})
		});

		it("Should return an error when not providing the current value", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						min: 0,
						max: 100
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.equal("The current value is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the storage", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						min: 0,
						max: 100
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.equal("A storage is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the maximum value", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						min: 0,
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.equal("The maximum value is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the minium value", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						max: 100
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.equal("The minimum value is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not the maximum value is smaller than the minimum", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						max: 1,
						min: 100
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.equal("The maximum value must be bigger than the minimum value");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not the maximum value is equal to the minimum", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						max: 10,
						min: 10
					}
				}

				new DataRepository().saveCompletion(data, function(err, result) {
					err.should.be.equal("The maximum value and minimum value cannot be equal");
					should.not.exist(result);
					done();
				});
			})
		});
	});

	describe("DataMessage", function() {
		it("Should create a new data point of type message", function(done) {
			Factory.create("storageMessage", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						title: new Chance().sentence({words: 5}),
				  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
				  	content: new Chance().paragraph({sentences: 2}),
				  	link: new Chance().url({domain: "wikipedia.org"})
					}
				}

				new DataRepository().saveMessage(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage", data.storage);
					result.value.should.be.an.Object;
					result.should.have.property("value");
					result.value.should.have.property("title", data.value.title);
					result.value.should.have.property("image", data.value.image);
					result.value.should.have.property("content", data.value.content);
					result.value.should.have.property("link", data.value.link);
					done();
				});
			});
		});

		it("Should return an error when not providing the storage", function(done) {
			Factory.create("storageMessage", function(storage) {
				var data = {
					value: {
						title: new Chance().sentence({words: 5}),
				  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
				  	content: new Chance().paragraph({sentences: 2}),
				  	link: new Chance().url({domain: "wikipedia.org"})
					}
				}

				new DataRepository().saveMessage(data, function(err, result) {
					err.should.be.equal("A storage is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the title", function(done) {
			Factory.create("storageMessage", function(storage) {
				var data = {
					value: {
				  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
				  	content: new Chance().paragraph({sentences: 2}),
				  	link: new Chance().url({domain: "wikipedia.org"})
					}
				}

				new DataRepository().saveMessage(data, function(err, result) {
					err.should.be.equal("The title is required");
					should.not.exist(result);
					done();
				});
			})
		});

		it("Should return an error when not providing the content", function(done) {
			Factory.create("storageMessage", function(storage) {
				var data = {
					value: {
						title: new Chance().sentence({words: 5}),
				  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
				  	link: new Chance().url({domain: "wikipedia.org"})
					}
				}

				new DataRepository().saveMessage(data, function(err, result) {
					err.should.be.equal("The content of the message is required");
					should.not.exist(result);
					done();
				});
			})
		});
	});


	// /************************************
	//  * ================================
	//  * ================================
	//  * ================================
	//  * GENERAL METHODS
	//  * ================================
	//  * ================================
	//  * ================================
	//  */


	describe("General methods", function() {
		it("Should create a new data point of type counter by calling save method", function(done) {
			Factory.create("storageCounter", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural(),
				}

				new DataRepository().save(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;

					result.should.have.property("storage");
					result.should.have.property("value", data.value);
					done();
				});
			});
		});

		it("Should create a new data point of type status by calling save method", function(done) {
			Factory.create("storageStatus", function(storage) {
				var data = {
					storage: storage.id,
					value: "ok",
				}

				new DataRepository().save(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage");
					result.should.have.property("value", data.value);
					done();
				});
			});
		});

		it("Should create a new data point of type graph by calling save method", function(done) {
			Factory.create("storageGraph", function(storage) {
				var data = {
					storage: storage.id,
					value: new Chance().natural(),
				}

				new DataRepository().save(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage");
					result.should.have.property("value", data.value);
					done();
				});
			});
		});

		it("Should create a new data point of type map by calling save method", function(done) {
			Factory.create("storageMap", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						value: new Chance().natural({min: 10, max: 100}),
						latitude: new Chance().latitude(),
						longitude: new Chance().longitude()
					}
				}

				new DataRepository().save(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage");
					result.should.have.property("value", data.value);
					done();
				});
			});
		});

		it("Should create a new data point of type completion by calling save method", function(done) {
			Factory.create("storageCompletion", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						current: new Chance().natural({min: 10, max: 100}),
						max: 100,
						min: 1
					}
				}

				new DataRepository().save(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage");
					result.should.have.property("value", data.value);
					done();
				});
			});
		});

		it("Should create a new data point of type message by calling save method", function(done) {
			Factory.create("storageMessage", function(storage) {
				var data = {
					storage: storage.id,
					value: {
						title: new Chance().sentence({words: 5}),
				  	image: "https://farm9.staticflickr.com/8245/8664397230_a6ed7abc86.jpg",
				  	content: new Chance().paragraph({sentences: 2}),
				  	link: new Chance().url({domain: "wikipedia.org"})
					}
				}

				new DataRepository().save(data, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;
					result.should.have.property("storage");
					result.should.have.property("value", data.value);
					done();
				});
			});
		});

		it("Should get a data point", function(done) {
			Factory.create("storageStatus", function(storage) {
				Factory.create("dataStatus", {storage: storage.id}, function(data) {
					new DataRepository().get(data.id, function(err, result) {
						err.should.be.false;
						result.should.be.an.Object,
						result.should.have.property("storage", storage.id);
						result.should.have.property("value", data.value);
						done();
					})
				})
			})
		});

		it("Should try to get a non existing type when calling get", function(done) {
			new DataRepository().get("abc", function(err, result) {
				err.should.not.be.false;
				result.should.be.false;
				done();
			})
		});

	});

	// /************************************
	//  * ================================
	//  * ================================
	//  * ================================
	//  * GET ALL
	//  * ================================
	//  * ================================
	//  * ================================
	//  */
	describe("Get all", function() {
		it("Should get all data of type status using the method all", function(done) {
			Factory.create("storageStatus", function(storage) {
				async.times(30, function(n, next) {
					Factory.create("dataStatus", {storage: storage.id}, function(data) {
						return next(false, data);
					});
				}, function(err, data) {
					new DataRepository().all(storage.id, function(err, results) {
						err.should.be.false;
						results.should.be.an.Array.with.lengthOf(25);
						done();
					});
				});
			});
		});
	});
});
