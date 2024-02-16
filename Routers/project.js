const express = require("express");
const router = express.Router();
const project = require("../models/project");
router.post("/api/todoist.com/createProject", async (req, res) => {
  try {
    const newProject = await project.create({
      ...req.body,
    });

    res.status(200).send(newProject);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("fedfd");
});

router.get("/api/todoist.com/getAllProjects", async (req, res) => {
  try {
    const projects = await project.findAll({
      order: [["order", "ASC"]],
    });
    res.status(200).send(projects);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/api/todoist.com/getProject/:id", async (req, res) => {
  try {
    const findProject = await project.findByPk(req.params.id);

    res.status(200).send(findProject);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/api/todoist.com/updateProject/:id", async (req, res) => {
  try {
    const order = await project.findByPk(req.params.id).order;

    await project.update(
      { ...req.body, order },
      { where: { id: req.params.id } }
    );
    res.status(200).send(await project.findByPk(req.params.id));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/api/todoist.com/deleteProject/:id", async (req, res) => {
  try {
    await project.destroy({ where: { id: req.params.id } });
    res.status(200).send();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
