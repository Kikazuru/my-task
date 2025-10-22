<template>
  <u-container>
    <div class="flex justify-end my-5 p-3">
      <project-create @created="loadProjects">
        <u-button class="cursor-pointer">create</u-button>
      </project-create>
    </div>

    <div v-if="projects.length > 0">
      <div class="grid grid-cols-4 gap-5 my-5">
        <template v-for="(project, i) in projects" :key="i">
          <project-preview :project="project" @removed="loadProjects" />
        </template>
      </div>

      <div class="w-full flex justify-center my-5">
        <u-pagination v-model:page="page" :items-per-page="limit" :total="total"></u-pagination>
      </div>
    </div>

    <div v-else>
      <div>No projects found</div>
    </div>
  </u-container>
</template>

<script setup lang="ts">
import projectRepo from '@/db/repositories/project'
import type { Project } from '@/models/project'
import { ref, watchEffect } from 'vue'
import ProjectCreate from './ProjectCreate.vue'
import ProjectPreview from './ProjectPreview.vue'

const projects = ref<Array<Project>>([])

const page = ref(1)
const limit = ref(8)
const total = ref(0)

function loadProjects() {
  projectRepo
    .list({
      page: page.value,
      limit: limit.value,
    })
    .then((data) => {
      projects.value = data
    })

  projectRepo.count().then((count) => {
    total.value = count
  })
}

watchEffect(() => {
  loadProjects()
})
</script>

<style scoped></style>
