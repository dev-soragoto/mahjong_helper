<template>
  <t-config-provider :globalConfig="gameStore.tdesignLanguageConfig">
    <router-view />
    <TabBar v-show="showTabBar" />
    <t-dialog
      v-model:visible="showUpdateDialog"
      :title="$t('pwa.updateTitle')"
      :confirm-btn="$t('pwa.updateNow')"
      :cancel-btn="$t('pwa.updateLater')"
      @confirm="applyUpdate"
    >
      <template #middle>
        <div class="update-dialog-description">{{ $t('pwa.updateDescription') }}</div>
      </template>
    </t-dialog>
  </t-config-provider>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/storage';
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import TabBar from './components/TabBar.vue';

const gameStore = useGameStore();
const route = useRoute();
const { locale, t } = useI18n();
const showTabBar = computed(() => route.path !== '/game');
const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
const showUpdateDialog = ref(false);

watch([needRefresh, () => route.path], ([refresh, path]) => {
  if (path === '/game') {
    showUpdateDialog.value = false;
  } else if (refresh) {
    showUpdateDialog.value = true;
  }
}, { immediate: true });

const applyUpdate = () => updateServiceWorker(true);

watch(() => gameStore.safeAreaExtra, (value) => {
  document.documentElement.style.setProperty('--safe-area-extra', `${value}px`);
}, { immediate: true });

const appNames: Record<string, string> = {
  zhCN: '面麻记分器',
  enUS: 'Mahjong Helper',
  jaJP: '麻雀点数記録'
};
const manifestNames: Record<string, string> = {
  zhCN: 'manifest.zh-CN.webmanifest',
  enUS: 'manifest.en-US.webmanifest',
  jaJP: 'manifest.ja-JP.webmanifest'
};

watch(locale, (value) => {
  const knownLocale = value in appNames ? value : 'zhCN';
  document.title = appNames[knownLocale] ?? t('pwa.appName');
  document.documentElement.lang = knownLocale === 'zhCN' ? 'zh-CN' : knownLocale === 'jaJP' ? 'ja-JP' : 'en-US';
  document.querySelector<HTMLLinkElement>('link[rel="manifest"]')?.setAttribute(
    'href', `${import.meta.env.BASE_URL}${manifestNames[knownLocale]}`
  );
}, { immediate: true });
</script>

<style>
:root {
  --td-button-large-height: 60px;
  --td-tab-bar-height: 40px;
  --td-dialog-body-max-height: 70vh;
  --td-navbar-height: 48px;
  --td-bg-color-page: #eee;
  --safe-area-extra: 0px;
  --safe-top: calc(env(safe-area-inset-top, 0px) + var(--safe-area-extra));
  --safe-right: calc(env(safe-area-inset-right, 0px) + var(--safe-area-extra));
  --safe-bottom: calc(env(safe-area-inset-bottom, 0px) + var(--safe-area-extra));
  --safe-left: calc(env(safe-area-inset-left, 0px) + var(--safe-area-extra));
  --td-navbar-padding-top: var(--safe-top);
  --app-navbar-space: calc(var(--td-navbar-height) + var(--safe-top));
}

html, body, #app { margin: 0; min-height: 100%; }
body {
  background-color: var(--td-bg-color-page);
  padding-left: var(--safe-left);
  padding-right: var(--safe-right);
}
.t-navbar__content {
  box-sizing: content-box;
  padding-left: var(--safe-left);
  padding-right: var(--safe-right);
}
.t-tab-bar--normal.t-tab-bar--safe {
  padding-bottom: var(--safe-bottom);
}

.update-dialog-description {
  padding: 8px 24px 24px;
  color: var(--td-text-color-secondary);
  font: var(--td-font-body-large);
  line-height: 1.5;
  text-align: center;
}
</style>
