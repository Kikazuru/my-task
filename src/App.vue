<template>
  <u-app>
    <u-header>
      <template #title> MyTask </template>
      <template #right>
        <u-color-mode-button></u-color-mode-button>
        <u-button
          to="https://github.com/kikazuru"
          target="_blank"
          icon="simple-icons:github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        ></u-button>
        <u-button icon="i-lucide-refresh-cw" color="neutral" variant="outline">sync</u-button>
      </template>
    </u-header>
    <u-main>
      <router-view></router-view>
    </u-main>
  </u-app>
</template>

<script setup lang="ts"></script>

<style scoped></style>
