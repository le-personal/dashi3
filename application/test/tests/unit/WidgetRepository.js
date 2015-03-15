'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var WidgetsRepository = include("api/repositories/WidgetsRepository");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

describe("WidgetsRepository", function() {

	describe("Get", function() {

		it("Should get a widget", function(done) {
			Factory.create("widgetCounter", function(widget) {
				new WidgetsRepository().get(widget.id, function(err, result) {
					err.should.be.false;
					result.should.be.an.Object;

					result.should.have.property("id", widget.id);
					// result.should.have.property("access_token").and.be.a.String;
					result.should.have.property("type", widget.type);
					result.should.have.property("title", widget.title);
					result.should.have.property("description", widget.description);

					done();
				})
			});
		});
	});

	// describe("Save", function() {
	// 	it("Should save a widget", function(done) {
	// 		var widget = {
	// 			id: new Chance().string({length: 24, pool: pool}),
	// 			type: "counter",
	// 			title: new Chance().sentence(),
	// 			description: new Chance().sentence(),
	// 			label: new Chance().word(),
	// 			row: 10,
	// 			col: 10,
	// 			sizeX: 10,
	// 			sizeY: 10
	// 		}
	//
	// 		new WidgetsRepository().save(widget, function(err, result) {
	// 			should.not.exist(err);
	// 			result.should.be.an.Object;
	//
	// 			result.should.have.property("id", widget.id);
	// 			result.should.have.property("access_token").and.be.a.String;
	// 			result.should.have.property("type", widget.type);
	// 			result.should.have.property("title", widget.title);
	// 			result.should.have.property("description", widget.description);
	// 			result.should.have.property("label", widget.label);
	// 			result.should.have.property("row", widget.row);
	// 			result.should.have.property("col", widget.col);
	// 			result.should.have.property("sizeX", widget.sizeX);
	// 			result.should.have.property("sizeY", widget.sizeY);
	//
	// 			done();
	// 		})
	// 	});
	//
	// 	describe("Access token", function() {
	// 		it("Should get an error when sending an access_token", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				access_token: "my-fake-access-token",
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("An access token is not required and must not be sent");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	// 	});
	//
	// 	describe("Type", function() {
	// 		it("Should get an error when not sending the type", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The widget type is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when not sending the type", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				type: undefined,
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The widget type is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when not sending the type", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				type: null,
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The widget type is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when not sending the type", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				title: "undefined",
	// 				name: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The widget type is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when not sending the type", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				type: "null",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The widget type is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending an invalid type", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				type: "invalidtype",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The widget type must be one of the following: message, completion, counter, graph, status, map");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	// 	});
	//
	// 	describe("Id", function() {
	// 		it("Should get an error when not sending the id", function(done) {
	// 			var widget = {
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The id is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending undefined as the id", function(done) {
	// 			var widget = {
	// 				id: undefined,
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The id is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending undefined as the id", function(done) {
	// 			var widget = {
	// 				id: "undefined",
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The id is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending null as the id", function(done) {
	// 			var widget = {
	// 				id: null,
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The id is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending null as the id", function(done) {
	// 			var widget = {
	// 				id: "null",
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The id is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending a number as the id", function(done) {
	// 			var widget = {
	// 				id: 1,
	// 				type: "counter",
	// 				title: new Chance().sentence(),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The id is required and must be a string");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	// 	});
	//
	// 	describe("Name", function() {
	// 		it("Should get an error when not sending the title", function(done) {
	// 			var widget = {
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				type: "counter",
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The title is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending undefined as the title", function(done) {
	// 			var widget = {
	// 				title: undefined,
	// 				type: "counter",
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The title is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending undefined as the title", function(done) {
	// 			var widget = {
	// 				title: "undefined",
	// 				type: "counter",
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The title is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending null as the title", function(done) {
	// 			var widget = {
	// 				title: null,
	// 				type: "counter",
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	//
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The title is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	//
	// 		it("Should get an error when sending null as the title", function(done) {
	// 			var widget = {
	// 				title: "null",
	// 				type: "counter",
	// 				id: new Chance().string({length: 24, pool: pool}),
	// 				description: new Chance().sentence(),
	// 				label: new Chance().word(),
	// 				row: 10,
	// 				col: 10,
	// 				sizeX: 10,
	// 				sizeY: 10
	// 			}
	// 			new WidgetsRepository().save(widget, function(err, result) {
	// 				err.should.be.equal("The title is required");
	// 				should.not.exist(result);
	// 				done();
	// 			})
	// 		});
	// 	});
	//
	// });

});
