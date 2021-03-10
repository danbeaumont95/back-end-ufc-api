exports.up = function (knex) {
  console.log("Creating types table");
  return knex.schema.createTable("types", (typesTable) => {
    typesTable.string("type").primary();
  });
};

exports.down = function (knex) {
  console.log("Dropping types table");
  return knex.schema.dropTable("types");
};
