const { selectAllStaff, selectStaffByFullName } = require('../models/staff.models')

exports.getAllStaff = (req, res, next) => {
    selectAllStaff()
    .then((staff) => {
        res.status(200).send({ staff })
    })
    .catch(next)
}

exports.getStaffByFullName = (req, res, next) => {
    const { full_name } = req.params;
    selectStaffByFullName(full_name)
    .then((staff) => {
        res.status(200).send({ staff })
    })
    .catch(next)
}