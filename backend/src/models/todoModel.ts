import { pool } from "../config/db.js";

export type Todo = {
  id: number;
  task: string;
  done: boolean;
  created_at: string;
  updated_at: string;
};

export const findAllTodos = async (): Promise<Todo[]> => {
  const result = await pool.query<Todo>(
    "SELECT * FROM todo_app ORDER BY created_at DESC"
  );
  return result.rows;
};

export const createTodo = async (task: string): Promise<Todo> => {
  const result = await pool.query<Todo>(
    "INSERT INTO todo_app (task) VALUES ($1) RETURNING *",
    [task]
  );
  return result.rows[0];
};

export const updateTodo = async (
  id: string,
  task: string | undefined,
  done: boolean | undefined
): Promise<Todo | undefined> => {
  const result = await pool.query<Todo>(
    `UPDATE todo_app
     SET task = COALESCE($1, task),
         done = COALESCE($2, done),
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [task, done, id]
  );
  return result.rows[0];
};

export const deleteTodo = async (id: string): Promise<Todo | undefined> => {
  const result = await pool.query<Todo>(
    "DELETE FROM todo_app WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
