<template>
  <u-container>
    <u-page-hero title="Projects"></u-page-hero>

    <u-button @click="add">add</u-button>
    <div class="grid grid-cols-4 gap-5">
      <template v-for="(project, i) in projects" :key="i">
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
              class="p-0"
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
    </div>
  </u-container>
</template>

<script setup lang="ts">
import { db, type Project } from '@/db'
import { liveQuery } from 'dexie'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const projects = ref<Array<Project>>([])

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
  db.projects.add({ name: 'New Project' })
}

function remove(id: Project['id']) {
  if (!id) return
  db.projects.delete(id)
}
</script>

<style scoped></style>
