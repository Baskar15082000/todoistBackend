const Sequelize = require("sequelize");
const sequelize = require("../DB-connection");
const project = sequelize.define(
  "project",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      notNull: true,
    },
    is_favorite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    order: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = project;
