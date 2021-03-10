const { selectAllItems, selectItemByType } = require("../models/store.models");

exports.getAllItems = (req, res, next) => {
  selectAllItems()
    .then((items) => {
      res.status(200).send({ items });
    })
    .catch(next);
};

exports.getItemByType = (req, res, next) => {
  const { type } = req.params;
  selectItemByType(type)
    .then((items) => {
      res.status(200).send({ items });
    })
    .catch(next);
};
