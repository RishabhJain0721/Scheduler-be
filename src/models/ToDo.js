import mongoose, { Schema } from "mongoose";

const toDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  attachment: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
const ToDo = mongoose.model("ToDo", toDoSchema);

export default ToDo;
