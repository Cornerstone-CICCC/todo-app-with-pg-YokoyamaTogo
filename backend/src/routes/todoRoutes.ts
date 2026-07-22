import { Router } from "express";
import {
  addTodo,
  editTodo,
  getTodos,
  removeTodo,
} from "../controllers/todoController.js";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", editTodo);
router.delete("/:id", removeTodo);

export default router;
