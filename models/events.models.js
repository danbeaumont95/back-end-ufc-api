const connection = require('../db/connection')

exports.selectAllEvents = () => {
    return connection
    .select('*')
    .from('events')
}