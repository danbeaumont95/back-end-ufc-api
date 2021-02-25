const express = require('express')
const weightRouter = express.Router()
const { getAllWeights } = require('../controllers/weight.controllers')

weightRouter.route('/').get(getAllWeights)

module.exports = weightRouter;