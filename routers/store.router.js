const express = require("express");
const storeRouter = express.Router();
const {
  getAllItems,
  getItemByType,
} = require("../controllers/store.controllers");

storeRouter.route("/").get(getAllItems);

storeRouter.route("/:type").get(getItemByType);

module.exports = storeRouter;
