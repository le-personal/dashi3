'use strict';

var assert = require("assert");
var should = require("should");
var include = require("include");
var bootstrap = include("test/bootstrap.test");
var Factory = require("sails-factory").load();
var Chance = require("chance");
var async = require("async");
var ApplicationRepository = include("api/repositories/ApplicationRepository");

describe("ApplicationRepository", function() {

	describe("Get", function() {
		it("Should get a application", function(done) {
			Factory.create("user", function(user) {
				Factory.create("application", {user: user.id}, function(application) {
					ApplicationRepository.get(application.id, function(err, result) {
						should.not.exist(err);
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("name", application.name);
						result.should.have.property("token", application.token);
						result.should.have.property("user");
						done();
					});
				})
			})
		});

		it("Should get a application as a promise", function(done) {
			Factory.create("user", function(user) {
				Factory.create("application", {user: user.id}, function(application) {
					ApplicationRepository.get(application.id)
					.then(function(result) {
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("name", application.name);
						result.should.have.property("token", application.token);
						result.should.have.property("user");
						done();
					})
					.fail(function(err) {
						should.not.exist(err);
					});
				})
			})
		});
	});

	describe("Get By Token", function() {
		it("Should get a application", function(done) {
			Factory.create("user", function(user) {
				Factory.create("application", {user: user.id}, function(application) {
					ApplicationRepository.getByToken(application.token, function(err, result) {
						should.not.exist(err);
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("name", application.name);
						result.should.have.property("token", application.token);
						result.should.have.property("user");
						done();
					});
				})
			})
		});

		it("Should get a application as a promise", function(done) {
			Factory.create("user", function(user) {
				Factory.create("application", {user: user.id}, function(application) {
					ApplicationRepository.getByToken(application.token)
					.then(function(result) {
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("name", application.name);
						result.should.have.property("token", application.token);
						result.should.have.property("user");
						done();
					})
					.fail(function(err) {
						should.not.exist(err);
					});
				})
			})
		});
	});

	describe("Get By name", function() {
		it("Should get a application", function(done) {
			Factory.create("user", function(user) {
				Factory.create("application", {user: user.id}, function(application) {
					ApplicationRepository.getByName(application.name, function(err, result) {
						should.not.exist(err);
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("name", application.name);
						result.should.have.property("token", application.token);
						result.should.have.property("user");
						done();
					});
				})
			})
		});

		it("Should get a application as a promise", function(done) {
			Factory.create("user", function(user) {
				Factory.create("application", {user: user.id}, function(application) {
					ApplicationRepository.getByName(application.name)
					.then(function(result) {
						result.should.be.an.Object;
						result.should.have.property("id");
						result.should.have.property("name", application.name);
						result.should.have.property("token", application.token);
						result.should.have.property("user");
						done();
					})
					.fail(function(err) {
						should.not.exist(err);
					});
				})
			})
		});
	});

	describe("All", function() {
		it("Should get all applications", function(done) {
			Factory.create("user", function(user) {
				async.times(
					5, 
					function(n, next) {	
						Factory.create("application", {user: user.id}, function(application) {
							return next(null, application);
						});
					},
					function(err, applications) {
						ApplicationRepository.all()
						.then(function(results) {
							results.should.be.an.Array;
							results[0].should.have.property("token");
							done();
						})
						.fail(function(err) {
							should.not.exist(err);
						});
					}
				);
			});
		})
	});

	describe("Save", function() {
		it("Should save a new application", function(done) {
			Factory.create("user", function(user) {
				var name = new Chance().word();
				ApplicationRepository.save(name, user.id, function(err, result) {
					should.not.exist(err);
					result.should.be.an.Object;
					result.should.have.property("name", name);
					result.should.have.property("token");
					result.should.have.property("user");
					done();
				});
			});
		});

		it("Should fail if the user is not sent", function(done) {
			var name = new Chance().word();
			ApplicationRepository.save(name, null, function(err, result) {
				should.exist(err);
				err.should.be.equal("No valid user");
				should.not.exist(result);
				done();
			});
		});

		it("Should save a new application using a promise", function(done) {
			Factory.create("user", function(user) {
				var name = new Chance().word();
				ApplicationRepository.save(name, user.id)
				.then(function(result) {
					result.should.be.an.Object;
					result.should.have.property("name", name);
					result.should.have.property("token");
					result.should.have.property("user");
					done();
				})
				.fail(function(err) {
					should.not.exist(err);
				});
			});
		});

		it("Should fail if the user is not sent as a promise", function(done) {
			var name = new Chance().word();
			ApplicationRepository.save(name, null)
			.then(function(result) {
				should.not.exist(result);
			})
			.fail(function(err) {
				should.exist(err);
				err.should.be.equal("No valid user");
				done();
			})
		});

		it("Should fail if the name is not sent", function(done) {
			var name = new Chance().word();
			Factory.create("user", function(user) {
				ApplicationRepository.save(null, user.id, function(err, result) {
					should.exist(err);
					err.should.be.equal("No valid name");
					should.not.exist(result);
					done();
				});
			});
		});

		it("Should fail if the name is not sent as a promise", function(done) {
			var name = new Chance().word();

			Factory.create("user", function(user) {
				ApplicationRepository.save(null, user.id)
				.then(function(result) {
					should.not.exist(result);
				})
				.fail(function(err) {
					should.exist(err);
					err.should.be.equal("No valid name");
					done();
				});
			});

		});
	});

	describe("Remove", function() {});

});

