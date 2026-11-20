<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()

const isHome = computed(() => route.path === '/')
</script>

<template>
  <div v-if="isHome">
    <RouterView />
  </div>

  <div v-else class="app-layout">
    <Sidebar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>