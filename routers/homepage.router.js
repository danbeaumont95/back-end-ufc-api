const homepageRouter = require("express").Router();
const { getWelcomeMessage } = require("../controllers/api.controllers");

homepageRouter.get("/", getWelcomeMessage);

module.exports = homepageRouter;
