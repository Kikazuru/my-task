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

const toast = useToast()

const emits = defineEmits<{
  (e: 'removed', id: Project['id']): void
}>()

function remove(id: Project['id']) {
  projectRepo
    .remove(id)
    .then(() => {
      toast.add({
        title: 'Removed',
        description: 'Project successfully removed',
        color: 'success',
        duration: 2000,
      })

      emits('removed', id)
    })
    .catch(() => {
      toast.add({
        title: 'Error',
        description: 'Failed to remove project',
        color: 'error',
      })
    })
}
</script>

<style scoped></style>
