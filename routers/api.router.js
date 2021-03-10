const apiRouter = require("express").Router();
const { getAllRoutes } = require("../controllers/api.controllers");
const fightersRouter = require("./fighters.router");
const staffRouter = require("./staff.router");
const eventsRouter = require("./events.router");
const weightRouter = require("./weight.router");
const storeRouter = require("./store.router");
const typesRouter = require("./types.router");

apiRouter.route("/").get(getAllRoutes);

apiRouter.use("/fighters", fightersRouter);

apiRouter.use("/staff", staffRouter);

apiRouter.use("/events", eventsRouter);

apiRouter.use("/weights", weightRouter);

apiRouter.use("/store", storeRouter);

apiRouter.use("/types", typesRouter);

module.exports = apiRouter;
