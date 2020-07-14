"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  handleClients,
  handleClient,
  handle404,
  createNewGuy,
  removeClient,
} = require("./handlers/clientHandlers.js");
express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  // endpoints
  .get("/clients", handleClients)
  .get("/clients/:id", handleClient)
  .get("/*", handle404)
  .post("/clients", createNewGuy)
  .delete("/clients/:id", removeClient)
  .listen(8000, () => console.log(`Listening on port 8000`));
