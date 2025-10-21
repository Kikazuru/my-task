<template>
  <u-container>
    <u-page-hero title="Projects"></u-page-hero>

    <u-button @click="add">add</u-button>
    <div class="grid grid-cols-4 gap-5">
      <template v-for="(project, i) in projects" :key="i">
        <project-card :project="project" :remove="remove" />
      </template>
    </div>
  </u-container>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { db } from '@/db'
import { ProjectRepository } from '@/db/repositories/project'
import type { Project } from '@/models/project'
import { liveQuery } from 'dexie'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const projects = ref<Array<Project>>([])

const repo = new ProjectRepository(db.projects)

onMounted(() => {
  const projectsLiveQuery = liveQuery(() => db.projects.toArray())
  const subscription = projectsLiveQuery.subscribe({
    next: (result) => {
      projects.value = result
    },
    error: (error) => {
      console.error('Failed to fetch projects:', error)
    },
  })

  // Clean up subscription when component is unmounted
  onBeforeUnmount(() => {
    subscription.unsubscribe()
  })
})

function add() {
  repo.create({ name: 'New Project' })
}

function remove(id: Project['id']) {
  repo.remove(id)
}
</script>

<style scoped></style>
