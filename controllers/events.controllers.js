const { selectAllEvents } = require('../models/events.models')

exports.getAllEvents = (req, res, next) => {
    selectAllEvents()
    .then((events) => {
        res.status(200).send({ events })
    })
    .catch(next)
}