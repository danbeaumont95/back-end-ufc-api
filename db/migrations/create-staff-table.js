exports.up = function(knex) {
    console.log('Creating staff table')
    return knex.schema.createTable('staff', (staffTable) => {
        staffTable.string('first_name');
        staffTable.string('surname');
        staffTable.string('full_name').primary();
        staffTable.integer('age');
        staffTable.string('role');
        staffTable.integer('years_at_company');
    })
}

exports.down = function(knex) {
    console.log('Dropping staff table')
    return knex.schema.dropTable('staff')
}