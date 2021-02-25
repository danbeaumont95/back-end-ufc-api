exports.up = function(knex) {
    console.log('Creating weight table')
    return knex.schema.createTable('weights', (weightTable) => {
        weightTable.string('weights');
    })
}

exports.down = function(knex) {
    console.log('Dropping weight table')
    return knex.schema.dropTable('weights');
}