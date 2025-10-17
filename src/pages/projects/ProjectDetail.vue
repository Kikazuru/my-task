<template>
  <u-container>
    <div>Project {{ id }}</div>
  </u-container>
</template>

<script setup lang="ts">
const { id } = defineProps<{
  id: string
}>()
</script>

<style scoped></style>
