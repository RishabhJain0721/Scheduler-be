import express from "express";
import {
  addTask,
  getAllTasks,
  deleteTask,
} from "../../controllers/toDoController.js";

const router = express.Router();

router.post("/add", addTask);
router.get("/getAll", getAllTasks);
router.delete("/delete/:id", deleteTask);

export default router;
