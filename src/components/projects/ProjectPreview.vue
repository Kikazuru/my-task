<template>
  <div>
    <project-card :project="project" :remove="remove" />
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import projectRepo from '@/db/repositories/project'
import taskRepo from '@/db/repositories/task'
import type { Project } from '@/models/project'

const { project } = defineProps<{
  project: Project
}>()

const toast = useToast()

const emits = defineEmits<{
  (e: 'removed', id: Project['id']): void
}>()

async function remove(id: Project['id']) {
  try {
    if (!id) throw new Error('Invalid project id')

    await projectRepo.remove(id)
    await taskRepo.removeByProject(id)

    toast.add({
      title: 'Removed',
      description: 'Project successfully removed',
      color: 'success',
      duration: 2000,
    })
    emits('removed', id)
  } catch {
    toast.add({
      title: 'Error',
      description: 'Failed to remove project',
      color: 'error',
    })
  }
}
</script>

<style scoped></style>
