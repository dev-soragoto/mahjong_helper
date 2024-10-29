<template>
  <div>
    <router-view />
  </div>
  <div>
    <TabBar class="tabbar" v-show="showTabBar" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TabBar from './components/TabBar.vue'
import router from './router';
import { ref, watch } from 'vue';

const showTabBar = ref(true)

watch(() => router.currentRoute.value.path, (newValue) => {
  showTabBar.value = newValue !== '/game'
}, { immediate: true })
</script>

<style>
:root {
  --td-button-large-height: 60px;
  --td-tab-bar-height: 40px;
}
</style>