const connection = require("../db/connection");

exports.selectAllItems = () => {
  return connection.select("*").from("store");
};

exports.selectItemByType = (type) => {
  return connection
    .select("*")
    .from("store")
    .where({ type })
    .then(([items]) => {
      if (!items) return Promise.reject({ status: 404, msg: "Type not found" });
      return items;
    });
};
