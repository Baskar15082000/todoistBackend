const express = require("express");
const router = express.Router();
const comment = require("../models/comment");
router.post("/api/todoist.com/createComment/:taskId", async (req, res) => {
  try {
    const newComment = await comment.create({
      ...req.body,
      taskId: req.params.taskId,
    });
    res.status(200).send(newComment);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("fedfd");
});
router.get("/api/todoist.com/getAllComments/:taskId", async (req, res) => {
  try {
    const comments = await comment.findAll({
      where: { taskId: req.params.taskId },
      order: [["postedAt", "ASC"]],
    });
    res.status(200).send(comments);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("fedfd");
});
router.put("/api/todoist.com/updateComment/:commentId", async (req, res) => {
  try {
    await comment.update(
      { ...req.body },
      {
        where: { id: req.params.commentId },
      }
    );
    res.status(200).send(await comment.findByPk(req.params.commentId));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("fedfd");
});
router.delete("/api/todoist.com/deleteComment/:commentId", async (req, res) => {
  try {
    await comment.destroy({ where: { id: req.params.commentId } });
    res.status(200).send();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("fedfd");
});

module.exports = router;
