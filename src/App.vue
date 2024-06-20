<script setup lang="ts">
import { RouterView } from 'vue-router'
import TabBar from './components/TabBar.vue'

</script>

<template>
  <TabBar class="tabbar" />
  <router-view />
</template>

<style>

:root {
  --td-button-large-height: 60px;
}

</style>
  