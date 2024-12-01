// controllers/toDoController.js

import { addRemainder } from "../services/toDoServices.js";
import {
  getAllTasksService,
  deleteTaskService,
} from "../services/toDoServices.js";

const addTask = async (req, res) => {
  try {
    const { title, description, attachment, date, email, mobile } = req.body;
    const job = await addRemainder({
      title,
      description,
      attachment,
      date,
      email,
      mobile,
    });
    res.status(201).json({ message: "Task added successfully", jobId: job.id });
  } catch (error) {
    if (error.message === "Invalid date") {
      return res.status(400).json({ message: "The provided date is invalid." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksService();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await deleteTaskService(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error.message === "Task not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addTask, getAllTasks, deleteTask };
