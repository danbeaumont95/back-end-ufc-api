const express = require("express");
const fightersRouter = express.Router();
const {
  getAllFighters,
  postNewFighter,
  getFightersByFullName,
  removeFightersByFullName,
  getFightersByWeight,
  getChampions,
} = require("../controllers/fighters.controllers");
const { methodNotFound } = require("../controllers/errors.controllers");

fightersRouter
  .route("/")
  .get(getAllFighters)
  .post(postNewFighter)
  .all(methodNotFound);
fightersRouter
  .route("/:full_name")
  .get(getFightersByFullName)
  .delete(removeFightersByFullName);
fightersRouter.route("/weight/:weight").get(getFightersByWeight);
fightersRouter.route("/champions/:champ_status").get(getChampions);

module.exports = fightersRouter;
