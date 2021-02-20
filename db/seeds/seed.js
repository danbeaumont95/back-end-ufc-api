const { fightersData, staffData } = require('../data/index')

exports.seed = function (knex) {
    return knex.migrate
    .rollback()
    .then(() => {
        return knex.migrate.latest()
    })
    .then(() => {
        return knex('fighters').insert(fightersData)
    })
    .then(() => {
        return knex('staff').insert(staffData)
    })
}