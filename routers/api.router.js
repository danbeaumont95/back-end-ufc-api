const apiRouter = require('express').Router();
const { getAllRoutes } = require('../controllers/api.controllers');
const fightersRouter = require('./fighters.router');
const staffRouter = require('./staff.router')
const eventsRouter = require('./events.router')
const weightRouter = require('./weight.router')

apiRouter.route('/').get(getAllRoutes)

apiRouter.use('/fighters', fightersRouter)

apiRouter.use('/staff', staffRouter)

apiRouter.use('/events', eventsRouter)

apiRouter.use('/weights', weightRouter)

module.exports = apiRouter;