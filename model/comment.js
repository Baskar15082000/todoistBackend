const Sequelize = require("sequelize");
const sequelize = require("../DB-connection");
const comment = sequelize.define(
  "comment",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING,
    },
    projecId: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    postedAt: {
      type: Sequelize.TIME,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = comment;
