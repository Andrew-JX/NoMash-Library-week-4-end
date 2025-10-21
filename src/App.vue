<!-- src/App.vue -->
<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>
    <main class="main-box">
      <!-- <LibraryRegistrationForm /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import BHeader from './components/BHeader.vue';
import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue';
</script>

<style scoped>
main {
  min-height: 60vh;
}
</style>
