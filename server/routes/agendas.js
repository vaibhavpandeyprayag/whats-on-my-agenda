const express = require("express");
const agendasRoutes = express.Router();
const dbo = require("../db/conn");

agendasRoutes.route("/agendas/createuseragenda").post((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("user_agendas").insertOne(req.body, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

agendasRoutes.route("/agendas/:username").get((req, response) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("user_agendas")
    .findOne({ username: req.params.username }, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

agendasRoutes.route("/agendas/add").post((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("user_agendas").updateOne(
    { username: req.body.username },
    {
      $push: {
        agendas: req.body.agenda,
      },
    },
    (err, res) => {
      if (err) throw err;
      response.json(res);
    }
  );
});

agendasRoutes.route("/agendas/update").post((req, response) => {
  let db_connect = dbo.getDb();
  var ind = `agendas.${req.body.index}`;
  db_connect.collection("user_agendas").updateOne(
    { username: req.body.username },
    {
      $set: {
        [ind]: req.body.agenda,
      },
    },
    (err, res) => {
      if (err) throw err;
      response.json(res);
    }
  );
});

agendasRoutes.route("/agendas/delete").post((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("user_agendas").updateOne(
    { username: req.body.username },
    {
      $pull: {
        agendas: req.body.agenda,
      },
    },
    (err, res) => {
      if (err) throw err;
      response.json(res);
    }
  );
});

module.exports = agendasRoutes;
