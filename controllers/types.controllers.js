const { selectAllTypes } = require("../models/types.models");

exports.getAllTypes = (req, res, next) => {
  selectAllTypes()
    .then((type) => {
      res.status(200).send({ type });
    })
    .catch(next);
};
