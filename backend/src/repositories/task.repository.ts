import Task, { TaskAttributes, TaskInstance } from "../models/task.model.js";
import { AppError } from "../utils/errors.js";

export class TaskRepository {
  async create(
    task: Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">,
  ): Promise<TaskInstance> {
    return Task.create(task);
  }

  async findById(id: number): Promise<TaskInstance> {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new AppError(404, `Task with ID ${id} not found`);
    }

    return task;
  }

  async findAll(): Promise<TaskInstance[]> {
    return Task.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async update(
    id: number,
    taskData: Partial<TaskAttributes>,
  ): Promise<TaskAttributes> {
    const task = await this.findById(id);
    return task.update(taskData);
  }

  async delete(id: number): Promise<void> {
    const task = await this.findById(id);
    await task.destroy();
  }
}
