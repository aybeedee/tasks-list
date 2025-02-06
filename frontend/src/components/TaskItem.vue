<template>
  <article
    class="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-xs hover:[animation-duration:_4s] dark:shadow-gray-700/25"
  >
    <div class="flex flex-col gap-5 rounded-[10px] bg-white p-4 !pt-10 sm:p-6 dark:bg-gray-900 hover:cursor-pointer" :class="{ 'grayscale': task.completed }">
      <div>
        <h2 class="text-white text-2xl font-extrabold mb-4" :class="{ 'line-through text-gray-500': task.completed }">{{ task.title }}</h2>
        <time class="block text-xs text-gray-500 dark:text-gray-400">
          {{ formattedDate }}
        </time>
        <h3 class="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
          {{ task.description }}
        </h3>
      </div>
      <div class="flex flex-row w-full gap-5">
        <button
        @click="emit('toggle-complete', task.id)"
        class="w-full cursor-pointer rounded-md border-none bg-gradient-to-r border border-blue-600 bg-blue-600 px-2 py-3 whitespace-nowrap text-lg font-bold text-white transition focus:outline-hidden hover:scale-[101.5%]"
      >
        {{ task.completed ? "Mark Incomplete" : "Mark Complete" }}
      </button>
      <button
        @click="emit('delete', task.id)"
        class="w-full cursor-pointer rounded-md border-none bg-gradient-to-r border border-purple-900 bg-purple-900 px-2 py-3 whitespace-nowrap text-lg font-bold text-white transition focus:outline-hidden hover:scale-[101.5%]"
      >
        Delete
      </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '../types/task';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits(["toggle-complete", "delete"]);

const formattedDate = computed(() => {
  if (!props.task.createdAt) return '';
  return new Date(props.task.createdAt).toDateString();
});
</script>