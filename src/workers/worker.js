import sendReminder from "../jobs/remainderJob.js";
import reminderQueue from "../queues/remainderQueue.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGODB_CONNECTION_STRING is not set");
}
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    reminderQueue.process(async (job) => {
      console.log(`Processing job: ${job.id}`);
      await sendReminder(job);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
