<template>
  <t-tab-bar v-model="value" theme="tag" :split="false" :fixed="true">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">

import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import router from '@/router';


const value = ref('game');

const list = ref([
  { value: 'game', label: '开始', icon: 'play' },
  { value: 'players', label: '玩家', icon: 'usergroup' },
  { value: 'history', label: '历史', icon: 'history' },
  { value: 'settings', label: '设定', icon: 'setting-1' },
]);

watch(
  () => value.value,
  (newValue) => {
    router.push({ name: newValue });
  },
);


let startX = 0;
let endX = 0;
const threshold = window.innerWidth * 0.4;

const handleTouchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX;
};


const handleTouchEnd = (e: TouchEvent) => {
  endX = e.changedTouches[0].clientX;
  let index = list.value.findIndex(item => item.value === value.value);
  if (endX - startX > threshold) {
    index = index > 0 ? index - 1 : list.value.length - 1;
  } else if (startX - endX > threshold) {
    index = index < list.value.length - 1 ? index + 1 : 0;
  }
  value.value = list.value[index].value;
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
