<template>
  <t-config-provider :globalConfig="gameStore.tdesignLanguageConfig">
    <div>
      <router-view />
    </div>
    <div>
      <TabBar class="tabbar" v-show="showTabBar" />
    </div>
  </t-config-provider>
</template>

<script setup lang="ts">
import { ref, watch,  provide} from 'vue';
import { RouterView } from 'vue-router';
import { useGameStore } from '@/stores/storage';
import TabBar from './components/TabBar.vue';
import router from './router';

const showTabBar = ref(true)

const key = ref(0)

const gameStore = useGameStore()

watch(() => router.currentRoute.value.path, (newValue) => {
  showTabBar.value = newValue !== '/game'
}, { immediate: true })
</script>

<style>
:root {
  --td-button-large-height: 60px;
  --td-tab-bar-height: 40px;
  --td-dialog-body-max-height: 70vh;
  --td-navbar-height: 48px;
  --td-bg-color-page: #eee;
}

body {
  background-color: var(--td-bg-color-page);
}
</style>