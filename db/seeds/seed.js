const { fightersData, staffData, eventsData, weightData } = require('../data/index')

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
    .then(() => {
        return knex('events').insert(eventsData)
    })
    .then(() => {
        return knex('weights').insert(weightData)
    })
}