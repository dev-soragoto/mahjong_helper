<template>
  <t-tab-bar v-model="currentPath" theme="tag" :split="false" :fixed="true">
    <t-tab-bar-item v-for="item in routeList" :key="item.value" :value="item.value">
      {{ $t(item.label) }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">

import router from '@/router';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const currentPath = ref('setup');

const routeList = ref([
  { value: 'setup', label: 'tab.start', icon: 'play' },
  { value: 'players', label: 'tab.player', icon: 'usergroup' },
  { value: 'history', label: 'tab.record', icon: 'history' },
  { value: 'settings', label: 'tab.setting', icon: 'setting-1' },
]);

watch(
  () => currentPath.value,
  (newValue) => {
    router.push({ name: newValue });
  },
);

watch(
  () => router.currentRoute.value.name?.toString(),
  (newValue) => {
    if (routeList.value.find(item => item.value === newValue) === undefined) {
      currentPath.value = 'setup';
    } else {
      currentPath.value = newValue ?? 'setup';
    }
  },
);

let startX = 0;
let endX = 0;
const threshold = window.innerWidth * 0.25;

const handleTouchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX;
};


const handleTouchEnd = (e: TouchEvent) => {
  endX = e.changedTouches[0].clientX;
  let index = routeList.value.findIndex(item => item.value === currentPath.value);
  if (endX - startX > threshold) {
    index = index > 0 ? index - 1 : routeList.value.length - 1;
    if (router.currentRoute.value.path === '/game') {
      index = 0;
      router.push({ name: 'setup' })
    }
  } else if (startX - endX > threshold) {
    index = index < routeList.value.length - 1 ? index + 1 : 0;
    if (router.currentRoute.value.path === '/game') {
      index = 0;
      router.push({ name: 'setup' })
    }
  }
  currentPath.value = routeList.value[index].value;
};

onMounted(() => {
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchend', handleTouchEnd);
});

onUnmounted(() => {
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchend', handleTouchEnd);
});

</script>

<style>
.t-tab-bar {
  z-index: 9999;
  position: fixed;
}
</style>
