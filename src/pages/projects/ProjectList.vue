<template>
  <u-container>
    <u-page-hero title="Projects"></u-page-hero>

    <div class="grid grid-cols-4 gap-5">
      <u-link :to="{ name: 'project-detail', params: { id: i } }" v-for="i in 10" :key="i">
        <u-card>
          <template #header> Project {{ i }} </template>
          <template #default>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between align-middle border-1 p-2 rounded">
                <div>On Progress</div>
                <u-badge color="primary" label="9"></u-badge>
              </div>
              <div class="flex justify-between align-middle border-1 p-2 rounded">
                <div>Warning</div>
                <u-badge color="warning" label="9"></u-badge>
              </div>
              <div class="flex justify-between align-middle border-1 p-2 rounded">
                <div>Expired</div>
                <u-badge color="error" label="9"></u-badge>
              </div>
            </div>
          </template>
        </u-card>
      </u-link>
    </div>
  </u-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
