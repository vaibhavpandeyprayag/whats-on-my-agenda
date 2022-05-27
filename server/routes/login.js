const express = require("express");
const loginRoutes = express.Router();
const dbo = require("../db/conn");

loginRoutes.route("/login/:username").get((req, response) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .findOne({ username: req.params.username }, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

module.exports = loginRoutes;
