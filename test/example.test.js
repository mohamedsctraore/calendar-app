var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

<<<<<<< HEAD
describe("GET /api/Task", function() {
=======
describe("GET /api/User", function() {
>>>>>>> 718fa4288844620b70594de2c37febbd0770c4c1
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
<<<<<<< HEAD
    return db.sequelize.sync({ force: true });
  });

  it("should find all tasks", function(done) {
    // Add some examples to the db to test with
    db.Task.bulkCreate([
      { taskTitle: "First Example", taskDescription: "First Description" },
      { taskTitle: "Second Example", taskDescription: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/Task").end(function(err, res) {
=======
    return db.sequelize.sync({ force: false });
    //set force:false to not delete data, because force true makes it run the table files again to re-create
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.User.bulkCreate([
      { username: "Harry",
      password: "password",
      firstName: "Harry",
      lastName: "Potter"},
      { username: "Luna",
      password: "password",
      firstName: "Luna",
      lastName: "Lovegood"}
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/User").end(function(err, res) {
>>>>>>> 718fa4288844620b70594de2c37febbd0770c4c1
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
<<<<<<< HEAD
          .that.includes({ taskTitle: "First Example", taskDescription: "First Description" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ taskTitle: "Second Example", taskDescription: "Second Description" });
=======
          .that.includes({ username: "Harry",
          password: "password",
          firstName: "Harry",
          lastName: "Potter" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({  username: "Luna",
          password: "password",
          firstName: "Luna",
          lastName: "Lovegood"});
>>>>>>> 718fa4288844620b70594de2c37febbd0770c4c1

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
