const express = require("express");
const typesRouter = express.Router();
const { getAllTypes } = require("../controllers/types.controllers");

typesRouter.route("/").get(getAllTypes);

module.exports = typesRouter;
