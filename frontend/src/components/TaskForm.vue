<template>
<form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex flex-col gap-2">
      <label class="block text-sm font-medium text-gray-200">
        Task Title
      </label>
      <input
          v-model="title"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all placeholder-gray-500 text-gray-200"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="block text-sm font-medium text-gray-200">
        Task Description
      </label>
    <textarea
        v-model="description"
        class="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all placeholder-gray-500 text-gray-200"
    ></textarea>
    </div>
    <button
    type="submit"
    class="w-full cursor-pointer rounded-md border-none bg-gradient-to-r from-blue-500 to-purple-600  px-12 py-3 text-lg font-bold text-white transition focus:outline-hidden hover:scale-[101.5%]"
    >
    Add Task
    </button>
</form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../types/task';

const emit = defineEmits<{
  (e: 'submit', task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void;
}>();

const title = ref('');
const description = ref('');

const handleSubmit = () => {
  if (!title.value.trim()) return;

  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false
  });

  title.value = '';
  description.value = '';
};
</script>