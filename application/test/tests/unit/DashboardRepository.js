'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var DashboardRepository = include("api/repositories/DashboardRepository");
var Factory = require("sails-factory").load();
var Chance = require("chance");

describe("DashboardRepository", function() {

	describe("Public", function() {
		it("Should get all public dashboards", function(done) {
			Factory.create("dashboard", {public: true}, function(dashboard) {
				DashboardRepository.getPublic(function(err, results) {
					err.should.be.false;

					results.should.have.lengthOf(1);

					results[0].should.have.property("id");
					results[0].should.have.property("name", dashboard.name);
					results[0].should.have.property("path", dashboard.path);
					results[0].should.have.property("public", true);
					results[0].should.have.property("description", dashboard.description);
					done();
				});
			});
		});
	})

	describe("Get", function() {
		it("Should save a fixed dashboard", function(done) {
			var data = {
				name: "Test dashboard name",
				description: "Test dashboard",
				path: "test",
				public: false,
			};

			Dashboard.create(data).exec(function(err, result) {
				should.exist(result.id);
				result.should.have.property("path", data.path);
				result.should.have.property("name", data.name);
				result.should.have.property("description", data.description);
				result.should.have.property("public", false);
				done();
			});
		});

		it("Should get a dashboard it", function(done) {
			Factory.create("dashboard", function(dashboard) {
				DashboardRepository.get(dashboard.id)
				.then(function(result) {
					result.should.have.property("id", dashboard.id);
					result.should.have.property("name", dashboard.name);
					result.should.have.property("path", dashboard.path);
					result.should.have.property("description", dashboard.description);
					done();
				});
			});
		});

		it("Should return an error when not finding a dashboard", function(done) {
			var id = 100;
			DashboardRepository.get(id)
			.then(function(result) {
				should.not.exist(result);
				done();
			})
			.fail(function(err) {
				err.should.not.be.false;
				done();
			});
		});

		it("Should get a dashboard using the path", function(done) {
			Factory.create("dashboard", function(dashboard) {
				DashboardRepository.getByPath(dashboard.path, function(err, result) {
					err.should.be.false;
					result.should.have.property("id", dashboard.id);
					result.should.have.property("name", dashboard.name);
					result.should.have.property("path", dashboard.path);
					result.should.have.property("description", dashboard.description);
					done();
				});
			});
		});
	});

	describe("Get all", function() {

		it("Should get all dashboards when no one was created", function(done) {
			DashboardRepository.getAll(function(err, results) {
				results.should.be.an.Array;
				err.should.be.false;
				results.should.have.lengthOf(0);
				done();
			});
		});

		it("Should create one dashboard and get them all", function(done) {
			Factory.create("dashboard", function(dashboard) {
				DashboardRepository.getAll(function(err, results) {
					results.should.be.an.Array;
					err.should.be.false;
					results.should.have.lengthOf(1);
					done();
				});
			});
		});
	});

	describe("Save", function() {
		it("Should save a dashboard", function(done) {
			var dash1 =  {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			DashboardRepository.save(dash1)
			.then(function(dashboard) {
				dashboard.should.have.property("id");
				dashboard.should.have.property("name", dash1.name);
				dashboard.should.have.property("path", dash1.path);
				dashboard.should.have.property("description", dash1.description);
				done();
			});
		});

		it("Should give an error when saving a duplicated path", function(done) {
			var path = new Chance().word();
			
			var dash2 =  {
				name: new Chance().word(),
				description: new Chance().string(),
				path: path
			};

			Factory.create("dashboard", {path: path}, function(dashboard) {
				DashboardRepository.save(dash2)
				.then(function(result) {
					result.should.be.false;
				})
				.fail(function(err) {
					err.should.not.be.false;
					done();
				})
			});
		});

		it("Should give an error when not providing the name of the dashboard", function(done) {
			var dash1 =  {
				name: null,
				description: new Chance().string(),
				path: new Chance().word()
			};

			DashboardRepository.save(dash1)
			.then(function(result) {
				should.not.exist(result);
			})
			.fail(function(err) {
				err.should.be.equal("No valid name")
				done();
			})
		});

		it("Should give an error when not providing the path of the dashboard", function(done) {
			var dash1 =  {
				name: new Chance().string(),
				description: new Chance().string(),
				path: ""
			};

			DashboardRepository.save(dash1)
			.then(function(result) {
				should.not.exist(result);
			})
			.fail(function(err) {
				err.should.not.be.false;
				err.should.be.equal("No valid path, enter another one");
				done();
			});
		});

	});

});