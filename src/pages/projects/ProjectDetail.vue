<template>
  <u-container>
    <u-page-hero :title="`Project ${id}`"></u-page-hero>

    <div class="flex flex-col gap-2">
      <template v-for="(task, i) in tasks" :key="i">
        <div class="flex justify-between border-1 rounded p-2">
          <div class="flex gap-2 flex-1">
            <u-checkbox
              :ui="{
                root: 'items-center',
              }"
              v-model="task.value.isCompleted"
            ></u-checkbox>
            <div
              @click="task.value.isCompleted = !task.value.isCompleted"
              :class="{ 'line-through': task.value.isCompleted }"
              class="cursor-pointer flex-1"
            >
              {{ task.value.title }}
            </div>
          </div>

          <div>
            <u-badge v-if="i % 3 == 0" color="info" label="Upcoming"></u-badge>
            <u-badge v-if="i % 3 == 1" color="success" label="On Going"></u-badge>
            <u-badge v-if="i % 3 == 2" color="error" label="Overdue"></u-badge>
          </div>
        </div>
      </template>
    </div>
  </u-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { id } = defineProps<{
  id: string
}>()

const tasks = Array.from({ length: 10 }, (_, i) =>
  ref({
    title: `Task ${i}`,
    isCompleted: false,
  }),
)
</script>

<style scoped></style>
