<template>
  <u-container>
    <u-page-hero :title="`Project ${id}`"></u-page-hero>

    <div class="grid grid-cols-4 gap-5">
      <u-link v-for="i in 10" :key="i">
        <u-card>
          <template #header>
            <div>Task {{ i }}</div>
          </template>
          <template #default> Task Description </template>
          <template #footer>
            <u-badge label="On Going"></u-badge>
          </template>
        </u-card>
      </u-link>
    </div>
  </u-container>
</template>

<script setup lang="ts">
const { id } = defineProps<{
  id: string
}>()
</script>

<style scoped></style>
