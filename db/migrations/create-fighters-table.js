exports.up = function(knex) {
    console.log('Creating fighters table')
    return knex.schema.createTable('fighters', (fightersTable) => {
        fightersTable.string('first_name');
        fightersTable.string('surname');
        fightersTable.string('full_name').primary();
        fightersTable.string('weight').notNullable();
        fightersTable.integer('age');
        fightersTable.string('dob');
        fightersTable.string('champ_status');
        fightersTable.string('next_fight');
        fightersTable.string('img_url')
    })
}

exports.down = function(knex) {
    console.log('Dropping fighters table')
    return knex.schema.dropTable('fighters')
}