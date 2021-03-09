const { selectAllItems } = require("../models/store.models");

exports.getAllItems = (req, res, next) => {
  selectAllItems()
    .then((items) => {
      res.status(200).send({ items });
    })
    .catch(next);
};
