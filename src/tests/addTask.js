import mongoose from "mongoose";
import { addRemainder } from "../services/toDoServices.js";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function testAddTask() {
  try {
    await mongoose.connect(MONGO_URI);

    const result = await addRemainder({
      title: "Test Task",
      description: "This is a test task description",
      attachment:
        "https://cdn.pixabay.com/photo/2024/04/04/03/08/ai-generated-8674235_1280.png",
      date: "2024-12-01T14:55",
      email: "2100521520041@ietlucknow.ac.in",
      mobile: "8755959835",
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

testAddTask()
  .then(() => {
    console.log("Success");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
