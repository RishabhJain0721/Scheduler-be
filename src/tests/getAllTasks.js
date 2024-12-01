import mongoose from "mongoose";
import { getAllTasksService } from "../services/toDoServices.js";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function testGetAllTasks() {
  try {
    await mongoose.connect(MONGO_URI);

    const tasks = await getAllTasksService();
    console.log(tasks);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

testGetAllTasks()
  .then(() => {
    console.log("Success");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
