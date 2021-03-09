exports.up = function (knex) {
  console.log("Creating store table");
  return knex.schema.createTable("store", (storeTable) => {
    storeTable.string("item_name").primary();
    storeTable.integer("price");
    storeTable.string("description");
    storeTable.string("sizes");
    storeTable.string("img_url");
  });
};

exports.down = function (knex) {
  console.log("Dropping fighters table");
  return knex.schema.dropTable("store");
};
