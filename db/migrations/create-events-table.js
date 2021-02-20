exports.up = function(knex) {
    console.log('Creating events table')
    return knex.schema.createTable('events', (eventsTable) => {
        eventsTable.string('event');
        eventsTable.string('location');
        eventsTable.string('date').primary()
        eventsTable.string('main_event');
        eventsTable.string('co_main_event');
        eventsTable.string('fight_three');
        eventsTable.string('fight_four');
    })
}

exports.down = function(knex) {
    console.log('Dropping events table')
    return knex.schema.dropTable('events')
}