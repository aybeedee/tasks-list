import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service.js";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTasks = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json({
        status: "success",
        data: { tasks },
      });
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const task = await this.taskService.getTaskById(Number(req.params.id));
      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const task = await this.taskService.updateTask(
        Number(req.params.id),
        req.body,
      );
      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.taskService.deleteTask(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
