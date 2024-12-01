import ToDo from "../models/ToDo.js";
import reminderQueue from "../queues/remainderQueue.js";

const addRemainder = async ({
  title,
  description,
  attachment,
  date,
  email,
  mobile,
}) => {
  const taskTimeIso = new Date(date).toISOString();
  const today = Date.now();

  let delay = new Date(taskTimeIso) - today;
  if (delay <= 0) {
    throw new Error("Invalid date");
  }

  delay = delay - 60 * 60 * 1000;

  if (delay < 0) {
    delay = 0;
  }

  const task = new ToDo({
    title,
    description,
    attachment,
    date: taskTimeIso,
    email,
    mobile,
  });
  await task.save();

  const job = await reminderQueue.add(
    { taskId: task._id, title, description, email, date, mobile },
    { delay, jobId: task._id.toString() }
  );

  return job;
};

const getAllTasksService = async () => {
  try {
    const tasks = await ToDo.find();
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

const deleteTaskService = async (taskId) => {
  try {
    const deletedTask = await ToDo.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new Error("Task not found");
    }

    const job = await reminderQueue.getJob(taskId);
    if (job) {
      await job.remove();
    }
    return deletedTask;
  } catch (error) {
    throw error;
  }
};

const updateTaskStatus = async (taskId, status) => {
  try {
    const updatedTask = await ToDo.findByIdAndUpdate(
      taskId,
      { done: status },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error(`Failed to update task with id: ${objectId}`);
    }

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

export {
  addRemainder,
  getAllTasksService,
  deleteTaskService,
  updateTaskStatus,
};
