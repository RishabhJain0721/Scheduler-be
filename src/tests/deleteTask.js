import mongoose from "mongoose";
import { deleteTaskService } from "../services/toDoServices.js";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function testDeleteTask() {
  try {
    await mongoose.connect(MONGO_URI);

    await deleteTaskService("674c206440f3f87f73f19c08");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

testDeleteTask()
  .then(() => {
    console.log("Success");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
