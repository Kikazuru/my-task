<template>
  <u-container>
    <div class="flex my-5 p-5 rounded-lg bg-default ring ring-default justify-between">
      <u-breadcrumb :items="[]"></u-breadcrumb>
      <u-button class="cursor-pointer" @click="add">add</u-button>
    </div>

    <div class="grid grid-cols-4 gap-5 my-5">
      <template v-for="(project, i) in projects" :key="i">
        <project-preview :project="project" @removed="loadProjects" />
      </template>
    </div>

    <div class="w-full flex justify-center my-5">
      <u-pagination v-model:page="page" :total="total"></u-pagination>
    </div>
  </u-container>
</template>

<script setup lang="ts">
import projectRepo from '@/db/repositories/project'
import type { Project } from '@/models/project'
import { ref, watchEffect } from 'vue'
import ProjectPreview from './ProjectPreview.vue'

const projects = ref<Array<Project>>([])

const page = ref(1)
const limit = ref(8)
const total = ref(0)

watchEffect(() => {
  loadProjects()
})

function add() {
  projectRepo.create({ name: 'New Project' }).then(() => {
    loadProjects()
  })
}

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
</script>

<style scoped></style>
