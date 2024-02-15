const express = require("express");
const sequelize = require("./DB-connection");
const { where } = require("sequelize");
const project = require("./model/project");
const task = require("./model/task");
const comment = require("./model/comment");
const label = require("./model/label");
const taskLabel = require("./model/taskLabel");
const projectRouter = require("./Routers/project");
const taskRouter = require("./Routers/task");
const commentRouter = require("./Routers/comment");

//Project table relation(one to many)
project.hasMany(task, { onDelete: "CASCADE" });
task.belongsTo(project, { onDelete: "CASCADE" });

//task comment relation(one to many)
task.hasMany(comment, { onDelete: "CASCADE" });
comment.belongsTo(task, { onDelete: "CASCADE" });

//task label relation(many to many)
task.belongsToMany(label, { through: taskLabel }, { onDelete: "CASCADE" });
label.belongsToMany(task, { through: taskLabel }, { onDelete: "CASCADE" });

const app = express();
const port = 3000;
app.use(express.json());

app.use(projectRouter, taskRouter, commentRouter);
app.listen(port, async () => {
  console.log("Listening on port " + port);
  try {
    // sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
