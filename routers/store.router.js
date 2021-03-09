const express = require("express");
const storeRouter = express.Router();
const { getAllItems } = require("../controllers/store.controllers");

storeRouter.route("/").get(getAllItems);

module.exports = storeRouter;
