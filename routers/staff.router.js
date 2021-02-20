const express = require('express')
const staffRouter = express.Router()
const { getAllStaff, getStaffByFullName } = require('../controllers/staff.controllers')

staffRouter.route('/').get(getAllStaff)
staffRouter.route('/:full_name').get(getStaffByFullName)

module.exports = staffRouter;