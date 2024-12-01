import Bull from "bull";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL;
const reminderQueue = new Bull("reminders", REDIS_URL);

export default reminderQueue;
