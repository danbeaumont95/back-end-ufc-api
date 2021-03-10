const connection = require("../db/connection");

exports.selectAllTypes = () => {
  return connection.select("*").from("types");
};
