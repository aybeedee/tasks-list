<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-900 py-10 px-6">
    <div class="max-w-2xl w-full">
      <h1 class="text-3xl font-bold mb-8 text-center text-white">Tasks List!</h1>
      
      <div class="mb-8">
        <TaskForm @submit="handleCreateTask" />
      </div>
  
      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded mb-4">
        {{ error }}
      </div>
  
      <div v-if="loading" class="text-center text-white">
        Loading tasks...
      </div>
  
      <div v-else class="space-y-4">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-complete="handleToggleComplete"
          @delete="handleDeleteTask"
        />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Task } from '../types/task';
import { TasksApi } from '../api/task';
import TaskForm from '../components/TaskForm.vue';
import TaskItem from '../components/TaskItem.vue';

const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchTasks = async () => {
  loading.value = true;
  error.value = null;
  try {
    tasks.value = await TasksApi.getAllTasks();
  } catch (e) {
    error.value = 'Failed to load tasks';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const handleCreateTask = async (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const task = await TasksApi.createTask(newTask);
    tasks.value.unshift(task);
  } catch (e) {
    error.value = 'Failed to create task';
    console.error(e);
  }
};

const handleToggleComplete = async (id: number) => {
  const task = tasks.value.find(t => t.id === id);
  if (!task) return;

  try {
    const updatedTask = await TasksApi.updateTask(id, { completed: !task.completed });
    const index = tasks.value.findIndex(t => t.id === id);
    tasks.value[index] = updatedTask;
  } catch (e) {
    error.value = 'Failed to update task';
    console.error(e);
  }
};

const handleDeleteTask = async (id: number) => {
  try {
    await TasksApi.deleteTask(id);
    tasks.value = tasks.value.filter(t => t.id !== id);
  } catch (e) {
    error.value = 'Failed to delete task';
    console.error(e);
  }
};

onMounted(fetchTasks);
</script>