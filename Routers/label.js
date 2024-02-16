const express = require("express");
const router = express.Router();
const label = require("../models/label");
const taskLabel = require("../models/taskLabel");
const task = require("../models/task");

router.post("/api/todoist.com/createLabel/:taskId", async (req, res) => {
  try {
    const newLabel = await label.create({
      ...req.body,
    });
    const findtask = await task.findByPk(req.params.taskId);
    await findtask.addLabels(newLabel);
    res.status(200).send(newLabel);
  } catch (error) {
    console.error("Error creating label:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/api/todoist.com/getTaskLabels/:taskId", async (req, res) => {
  try {
    const taskLabels = await taskLabel.findAll({
      where: { taskId: req.params.taskId },
    });

    const labels = await Promise.all(
      taskLabels.map(async (e) => {
        return await label.findByPk(e.labelId);
      })
    );

    res.status(200).send(labels);
  } catch (error) {
    console.error("Error finding labels:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/api/todoist.com/updateTaskLabel/:labelId", async (req, res) => {
  try {
    const taskLabels = await label.update(
      { ...req.body },
      {
        where: { id: req.params.labelId },
      }
    );

    res.status(200).send(await label.findByPk(req.params.labelId));
  } catch (error) {
    console.error("Error while updating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/todoist.com/getTasksByLabel/:name", async (req, res) => {
  try {
    const labels = await label.findAll({
      where: { name: req.params.name },
    });

    const findingtaskId = await Promise.all(
      labels.map(async (e) => {
        const t = await taskLabel.findAll({ where: { labelId: e.id } });
        return t[0];
      })
    );

    const tasks = [];
    for (const e of findingtaskId) {
      const t = await task.findByPk(e.taskId);
      if (!tasks.some((task) => task.id === t.id)) {
        tasks.push(t);
      }
    }
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Error while find task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/api/todoist.com/deleteLabel/:labelId", async (req, res) => {
  try {
    await label.destroy({ where: { id: req.params.labelId } });
    res.status(200).send();
  } catch (error) {
    console.log("Error while deleting");
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
