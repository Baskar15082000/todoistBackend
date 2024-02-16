const express = require("express");
const router = express.Router();
const task = require("../models/task");

router.post("/api/todoist.com/createTask/:projectId", async (req, res) => {
  try {
    const newTask = await task.create({
      ...req.body,
      projectId: req.params.projectId,
    });
    res.status(200).send(newTask);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/api/todoist.com/getAllTasks/:projectId", async (req, res) => {
  try {
    const tasks = await task.findAll({
      where: { projectId: req.params.projectId },
    });
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/api/todoist.com/deleteTask/:taskId", async (req, res) => {
  try {
    await task.destroy({
      where: { id: req.params.taskId },
    });
    res.status(200).send();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/api/todoist.com/updateTask/:taskId", async (req, res) => {
  try {
    await task.update(
      { ...req.body },
      {
        where: { id: req.params.taskId },
      }
    );

    res.status(200).send(await task.findByPk(req.params.taskId));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
