<template>
  <u-container>
    <u-page-hero :title="project?.name"></u-page-hero>

    <u-button @click="create">create</u-button>

    <div class="flex flex-col space-y-4 mt-4">
      <template v-for="(task, i) in tasks" :key="i">
        <div class="flex justify-between border-1 rounded p-2">
          <div class="flex gap-2 flex-1">
            <u-checkbox
              :ui="{
                root: 'items-center',
              }"
              :model-value="task.completedAt != null"
              @click="toggleComplete(task)"
            ></u-checkbox>
            <div
              @click="toggleComplete(task)"
              :class="{ 'line-through': task.completedAt != null }"
              class="cursor-pointer flex-1"
            >
              {{ task.title }}
            </div>
          </div>

          <div>
            <u-tooltip v-if="task.completedAt" :text="`${formatDate(task.completedAt)}`">
              <u-badge label="Completed"></u-badge>
            </u-tooltip>
            <u-tooltip
              v-else-if="task.startAt && now < task.startAt"
              :text="`${formatDate(task.startAt)} }`"
            >
              <u-badge color="info" label="Upcoming"></u-badge>
            </u-tooltip>
            <u-tooltip
              v-else-if="task.startAt && task.endAt && task.startAt < now && now < task.endAt"
              :text="`${formatDate(task.startAt)} - ${formatDate(task.endAt)}`"
            >
              <u-badge color="neutral" label="On Going"></u-badge>
            </u-tooltip>
            <u-tooltip
              v-else-if="task.endAt && now > task.endAt"
              :text="`${formatDate(task.endAt)}`"
            >
              <u-badge color="error" label="Overdue"></u-badge>
            </u-tooltip>
            <u-badge v-else color="info" label="Uncompleted"></u-badge>
          </div>
        </div>
      </template>
    </div>
  </u-container>
</template>

<script setup lang="ts">
import projectRepo from '@/db/repositories/project'
import taskRepo from '@/db/repositories/task'
import type { Project } from '@/models/project'
import type { Task } from '@/models/task'
import { useDateFormat, useNow } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const now = useNow()

const { id } = defineProps<{
  id: string
}>()

const project = ref<Project>()
const tasks = ref<Array<Task>>([])

projectRepo
  .detail(Number(id))
  .then((data) => {
    project.value = data
  })
  .catch((error) => {
    console.error(error)
  })

const toast = useToast()

function toggleComplete(task: Task) {
  if (task.completedAt) task.completedAt = undefined
  else task.completedAt = new Date()

  taskRepo
    .update(task.id, task)
    .then(() => {
      if (task.completedAt)
        toast.add({
          title: 'Completed',
          color: 'success',
          description: `${task.title} marked as completed.`,
        })
      else
        toast.add({
          title: 'Uncompleted',
          color: 'info',
          description: `${task.title} marked as uncompleted.`,
        })
      listTasks()
    })
    .catch((error) => {
      console.error(error)
    })
}

function listTasks() {
  taskRepo
    .listByProject(Number(id))
    .then((data) => {
      tasks.value = data
    })
    .catch((error) => {
      console.error(error)
    })
}

function create() {
  const newTask: Task = {
    projectId: Number(id),
    title: 'New Task',
  }
  taskRepo
    .create(newTask)
    .then(() => {
      listTasks()
    })
    .catch((error) => {
      console.error(error)
    })
}

watchEffect(() => {
  listTasks()
})

function formatDate(date: Date) {
  return useDateFormat(date, 'DD MMM YYYY HH:mm').value
}
</script>

<style scoped></style>
