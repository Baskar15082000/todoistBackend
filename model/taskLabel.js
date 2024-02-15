const Sequelize = require("sequelize");
const sequelize = require("../DB-connection");
const taskLabel = sequelize.define(
  "taskLabel",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = taskLabel;
