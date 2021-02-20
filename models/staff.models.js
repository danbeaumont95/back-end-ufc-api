const connection = require('../db/connection')

exports.selectAllStaff = () => {
    return connection
    .select('*')
    .from('staff')
}

exports.selectStaffByFullName = (full_name) => {
    return connection
    .select('*')
    .from('staff')
    .where({ full_name })
    .then(([staff]) => {
        if (!staff) return Promise.reject({ status: 404, msg: 'No staff found' })
        return staff;
    })
}