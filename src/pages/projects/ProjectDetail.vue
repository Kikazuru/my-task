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
            <u-badge v-if="task.value.isCompleted" label="Completed"></u-badge>
            <u-badge v-else-if="now < task.value.startAt" color="info" label="Upcoming"></u-badge>
            <u-badge
              v-else-if="task.value.startAt < now && now < task.value.endAt"
              color="neutral"
              label="On Going"
            ></u-badge>
            <u-badge v-else-if="now > task.value.endAt" color="error" label="Overdue"></u-badge>
          </div>
        </div>
      </template>
    </div>
  </u-container>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core'
import { ref } from 'vue'

const now = useNow()

const { id } = defineProps<{
  id: string
}>()

const tasks = Array.from({ length: 10 }, (_, i) => {
  const startAt = getRandomDate(new Date('2025-01-01'), new Date('2025-12-31'))
  const endAt = getRandomDate(startAt, new Date('2025-12-31'))
  return ref({
    title: `Task ${i}`,
    isCompleted: false,
    startAt: startAt,
    endAt: endAt,
  })
})

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
</script>

<style scoped></style>
