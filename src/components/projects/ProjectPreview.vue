<template>
  <div>
    <project-card :project="project" :remove="remove" />
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import projectRepo from '@/db/repositories/project'
import type { Project } from '@/models/project'

const { project } = defineProps<{
  project: Project
}>()

const emits = defineEmits<{
  (e: 'removed', id: Project['id']): void
}>()

function remove(id: Project['id']) {
  projectRepo.remove(id).then(() => {
    emits('removed', id)
  })
}
</script>

<style scoped></style>
