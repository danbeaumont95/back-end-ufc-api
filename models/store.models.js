const connection = require("../db/connection");

exports.selectAllItems = () => {
  return connection.select("*").from("store");
};
