import sendRemainderMail from "../jobs/mailer.js";
import { updateTaskStatus } from "../services/toDoServices.js";

const sendReminder = async (job) => {
  await sendRemainderMail(job.data);
  await updateTaskStatus(job.id, true);
};

export default sendReminder;
