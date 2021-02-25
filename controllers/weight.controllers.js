const { selectAllWeights } = require('../models/weight.models')

exports.getAllWeights = (req, res, next) => {
    selectAllWeights()
    .then((weights) => {
        res.status(200).send({ weights })
    })
    .catch(next)
}