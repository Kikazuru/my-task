<template>
  <u-card
    :ui="{
      header: 'flex align-middle justify-between',
    }"
  >
    <template #header>
      <u-link :to="{ name: 'project-detail', params: { id: project.id } }">
        {{ project.name }}
      </u-link>
      <u-button
        @click="remove(project.id)"
        class="p-0 cursor-pointer"
        variant="link"
        icon="i-lucide-x"
      ></u-button>
    </template>
    <template #default>
      <div class="flex flex-col gap-2">
        <div class="flex justify-between align-middle border-1 p-2 rounded">
          <div>Upcoming</div>
          <u-badge color="info" label="9"></u-badge>
        </div>
        <div class="flex justify-between align-middle border-1 p-2 rounded">
          <div>On Going</div>
          <u-badge color="success" label="9"></u-badge>
        </div>
        <div class="flex justify-between align-middle border-1 p-2 rounded">
          <div>Overdue</div>
          <u-badge color="error" label="9"></u-badge>
        </div>
      </div>
    </template>
  </u-card>
</template>

<script setup lang="ts">
import type { Project } from '@/models/project'

const { project, remove } = defineProps<{
  project: Project
  remove: (id: Project['id']) => void
}>()
</script>

<style scoped></style>
