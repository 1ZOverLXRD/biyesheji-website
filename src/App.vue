<template>
  <div class="app-layout">
    <NavBar />
    <main class="app-main">
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<style>
@import './styles/app.css';
</style>