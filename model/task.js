const Sequelize = require("sequelize");
const sequelize = require("../DB-connection");
const task = sequelize.define(
  "task",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING,
      notNull: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = task;
