const connection = require("../db/connection");

exports.selectAllFighters = () => {
  return connection.select("*").from("fighters");
};

exports.addNewFighter = (fighter) => {
  return connection("fighters")
    .insert(fighter)
    .returning("*")
    .then(([fighter]) => {
      return fighter;
    });
};

exports.selectFightersByFullName = (full_name) => {
  return connection
    .select("*")
    .from("fighters")
    .where({ full_name })
    .then(([fighter]) => {
      if (!fighter)
        return Promise.reject({ status: 404, msg: "Fighter not found" });
      return fighter;
    });
};

exports.deleteFightersByFullName = (full_name, first_name) => {
  return connection("fighters")
    .delete()
    .where({ full_name, first_name })
    .then((count) => {
      if (count === 0) {
        throw { status: 404, msg: "No fighter found" };
      }
    });
};

exports.selectFightersByWeight = (weight) => {
  return connection
    .select("*")
    .from("fighters")
    .where({ weight })
    .then((fighters) => {
      if (!fighters)
        return Promise.reject({ status: 404, msg: "Fighters not found" });
      else return fighters;
    });
};

exports.selectChampions = (champ_status) => {
  return connection
    .select("*")
    .from("fighters")
    .whereNot(champ_status, "NA")
    .then((fighters) => {
      if (!fighters)
        return Promise.reject({ status: 404, msg: "No champions found" });
      else return fighters;
    });
};
