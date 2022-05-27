const express = require("express");
const usersRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Gets a list of all users
usersRoutes.route("/users/").get((req, response) => {
  let db_connect = dbo.getDb("whatsonmyagenda");
  db_connect
    .collection("users")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

// Deletes a user
usersRoutes.route("/users/:username").delete((req, response) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .find({ username: req.params.username }, (err, obj) => {
      if (err) throw err;
      console.log("1 document(user) deleted");
      response.json(obj);
    });
});

module.exports = usersRoutes;
