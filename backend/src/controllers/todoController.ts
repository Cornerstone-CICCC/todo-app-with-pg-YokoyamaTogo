import type { Request, Response } from "express";
import * as todoModel from "../models/todoModel.js";

const getId = (id: string | string[]) => (Array.isArray(id) ? id[0] : id);

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await todoModel.findAllTodos();
  res.json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
  const { task } = req.body as { task?: unknown };

  if (typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ error: "task is required" });
  }

  const todo = await todoModel.createTodo(task.trim());
  res.status(201).json(todo);
};

export const editTodo = async (req: Request, res: Response) => {
  const id = getId(req.params.id);
  const { task, done } = req.body as { task?: unknown; done?: unknown };

  const todo = await todoModel.updateTodo(
    id,
    typeof task === "string" ? task : undefined,
    typeof done === "boolean" ? done : undefined
  );

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
};

export const removeTodo = async (req: Request, res: Response) => {
  const todo = await todoModel.deleteTodo(getId(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).send();
};
