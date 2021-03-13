const {
  selectAllFighters,
  addNewFighter,
  selectFightersByFullName,
  deleteFightersByFullName,
  selectFightersByWeight,
  selectChampions,
} = require("../models/fighters.models");

exports.getAllFighters = (req, res, next) => {
  // const sort_by = req.query.sort_by
  selectAllFighters()
    .then((fighters) => {
      res.status(200).send({ fighters });
    })
    .catch(next);
};

exports.postNewFighter = (req, res, next) => {
  const fighter = req.body;
  addNewFighter(fighter)
    .then((fighter) => {
      res.status(201).send({ fighter });
    })
    .catch(next);
};

exports.getFightersByFullName = (req, res, next) => {
  const { full_name } = req.params;
  selectFightersByFullName(full_name)
    .then((fighter) => {
      res.send({ fighter });
    })
    .catch(next);
};

exports.removeFightersByFullName = (req, res, next) => {
  const { full_name } = req.params;
  const { first_name } = req.body;
  deleteFightersByFullName(full_name, first_name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
};

exports.getFightersByWeight = (req, res, next) => {
  const { weight } = req.params;
  // Promise.all([
  //     selectFightersByWeight(weight)
  // ])
  // .then(( [fighters]) => {

  //     res.status(200).send({ fighters })
  // })
  // .catch(error => console.log(error));
  selectFightersByWeight(weight)
    .then((fighters) => {
      res.send({ fighters });
    })
    .catch(next);
};

exports.getChampions = (req, res, next) => {
  const { champ_status } = req.params;
  selectChampions(champ_status)
    .then((fighters) => {
      res.send({ fighters });
    })
    .catch(next);
};
