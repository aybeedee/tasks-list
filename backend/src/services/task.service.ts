import { TaskAttributes, TaskInstance } from "../models/task.model.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { AppError } from "../utils/errors.js";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(
    taskData: Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">,
  ): Promise<TaskInstance> {
    if (!taskData.title) {
      throw new AppError(400, "Task title is required");
    }
    return this.taskRepository.create(taskData);
  }

  async getAllTasks(): Promise<TaskInstance[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: number): Promise<TaskInstance> {
    return this.taskRepository.findById(id);
  }

  async updateTask(
    id: number,
    taskData: Partial<TaskAttributes>,
  ): Promise<TaskAttributes> {
    return this.taskRepository.update(id, taskData);
  }

  async deleteTask(id: number): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
