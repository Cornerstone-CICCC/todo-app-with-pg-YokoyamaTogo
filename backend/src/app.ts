import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Todo API is running" });
});

app.use("/todos", todoRoutes);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
