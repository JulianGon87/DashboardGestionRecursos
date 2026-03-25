<template>
  <div class="app-container" :class="{ 'no-sidebar': isAuthRoute }">
    <Sidebar v-if="!isAuthRoute" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const isAuthRoute = computed(() => ['login', 'registro'].includes(route.name))
</script>

 
