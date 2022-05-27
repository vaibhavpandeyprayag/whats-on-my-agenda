const express = require("express");
const signinRoutes = express.Router();
const dbo = require("../db/conn");

signinRoutes.route("/signin").post((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("users").insertOne(req.body, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = signinRoutes;
