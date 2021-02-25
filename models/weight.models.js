const connection = require('../db/connection')

exports.selectAllWeights = () => {
    return connection
    .select('*')
    .from('weights')
}