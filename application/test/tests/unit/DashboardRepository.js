'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap");
var DashboardRepository = include("api/repositories/DashboardRepository");
var Factory = include("test/factories/Dashboard");
var Chance = require("chance");

describe("DashboardRepository", function() {
	describe("Get", function() {
		it("Should save a fixed dashboard", function(done) {
			var data = {
				name: "Test dashboard name",
				description: "Test dashboard",
				path: "test"
			};

			Dashboard.create(data).exec(function(err, result) {
				result.should.have.property("id");
				result.should.have.property("path", data.path);
				result.should.have.property("name", data.name);
				result.should.have.property("description", data.description);
				done();
			});
		});

		it("Should verify that the database is being truncated", function(done) {
			new DashboardRepository().get(1, function(err, result) {
				result.should.not.have.property("id", 1);
				result.should.not.have.property("name", "Test dashboard name");
				result.should.not.have.property("path", "test");
				result.should.not.have.property("description", "Test dashboard");
				done();
			});
		});

		it("Should create a dashboard and get it", function(done) {
			var data = {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			Factory.create("dashboard", data, function(err, id) {
				new DashboardRepository().get(id, function(err, result) {
					err.should.be.false;
					result.should.have.property("id", id);
					result.should.have.property("name", data.name);
					result.should.have.property("path", data.path);
					result.should.have.property("description", data.description);
					done();
				});
			});
		});

		it("Should return an error when not finding a dashboard", function(done) {
			var id = 100;
			new DashboardRepository().get(id, function(err, result) {
				err.should.not.be.false;
				result.should.be.false;
				done();
			});
		});

		it("Should get a dashboard using the path", function(done) {
			var data = {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			Factory.create("dashboard", data, function(err, id) {
				new DashboardRepository().getByPath(data.path, function(err, result) {
					err.should.be.false;
					result.should.have.property("id", id);
					result.should.have.property("name", data.name);
					result.should.have.property("path", data.path);
					result.should.have.property("description", data.description);
					done();
				});
			});
		});
	});

	describe("Get all", function() {

		it("Should get all dashboards when no one was created", function(done) {
			new DashboardRepository().getAll(function(err, results) {
				results.should.be.an.Array;
				err.should.be.false;
				results.should.have.lengthOf(0);
				done();
			});
		});

		it("Should create one dashboards and get them all", function(done) {
			var dash1 =  {
				name: new Chance().word(),
				description: new Chance().string(),
				path: new Chance().word()
			};

			Factory.create("dashboard", dash1, function(err, id1) {
				new DashboardRepository().getAll(function(err, results) {
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

			new DashboardRepository().save(dash1, function(err, dashboard) {
				err.should.be.false;
				dashboard.should.have.property("id");
				dashboard.should.have.property("name", dash1.name);
				dashboard.should.have.property("path", dash1.path);
				dashboard.should.have.property("description", dash1.description);
				done();
			});
		});

		it("Should give an error when saving a duplicated path", function(done) {
			var path = new Chance().word();
			var dash1 =  {
				name: new Chance().word(),
				description: new Chance().string(),
				path: path
			};

			var dash2 =  {
				name: new Chance().word(),
				description: new Chance().string(),
				path: path
			};

			Factory.create("dashboard", dash1, function(err, id) {
				new DashboardRepository().save(dash2, function(err, result) {
					result.should.be.false;
					err.should.not.be.false;
					done();
				});
			});
		});

		it("Should give an error when not providing the name of the dashboard", function(done) {
			var dash1 =  {
				name: null,
				description: new Chance().string(),
				path: new Chance().word()
			};

			new DashboardRepository().save(dash1, function(err, result) {
				err.should.not.be.false;
				result.should.be.false;
				done();
			});
		});

		it("Should give an error when not providing the path of the dashboard", function(done) {
			var dash1 =  {
				name: new Chance().string(),
				description: new Chance().string(),
				path: ""
			};

			new DashboardRepository().save(dash1, function(err, result) {
				err.should.not.be.false;
				result.should.be.false;
				done();
			});
		});

	});

});