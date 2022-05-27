const express = require("express");
const usernamesRoutes = express.Router();

const dbo = require("../db/conn");

usernamesRoutes.route("/usernames/").get((req, response) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("usernames")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

usernamesRoutes.route("/usernames/add").post((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = req.body;
  db_connect.collection("usernames").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = usernamesRoutes;
