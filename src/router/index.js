import express from "express";
import toDoRoutes from "./src/toDoRoutes.js";

const router = express.Router();

router.use("/toDo", toDoRoutes);

export default router;
