import axios from "axios";
import type { Task } from "../types/task";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const TasksApi = {
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get("/tasks");
    return response.data.data.tasks;
  },

  async createTask(
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ): Promise<Task> {
    const response = await api.post("/tasks", task);
    return response.data.data.task;
  },

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const response = await api.patch(`/tasks/${id}`, task);
    return response.data.data.task;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
