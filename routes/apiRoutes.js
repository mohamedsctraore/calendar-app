var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/User", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/Task", function(req, res) {
    db.Task.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/User", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/Task", function(req, res) {
    console.log(req.body);
    db.Task.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //Check database for login
  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(dbUser) {
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  app.post("/api/tasks", function(req, res) {
    db.User.findOne({
      include: [db.Task],
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  // Delete an example by id
  app.delete("/api/User/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
