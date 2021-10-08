const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;