const express = require('express')
const eventsRouter = express.Router()
const { getAllEvents } = require('../controllers/events.controllers')

eventsRouter.route('/').get(getAllEvents)

module.exports = eventsRouter;