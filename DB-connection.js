const Sequelize = require("sequelize");

const sequelize = new Sequelize("todoist", "postgres", "5858", {
  dialect: "postgres",
});
module.exports = sequelize;
