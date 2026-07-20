import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const installPrompt = ref<BeforeInstallPromptEvent>();
const standalone = ref(false);

export function usePwaInstall() {
  const refreshStandalone = () => {
    standalone.value = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  };
  const capturePrompt = (event: Event) => {
    event.preventDefault();
    installPrompt.value = event as BeforeInstallPromptEvent;
  };
  const clearPrompt = () => { installPrompt.value = undefined; };

  onMounted(() => {
    refreshStandalone();
    window.addEventListener('beforeinstallprompt', capturePrompt);
    window.addEventListener('appinstalled', clearPrompt);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', capturePrompt);
    window.removeEventListener('appinstalled', clearPrompt);
  });

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const canInstall = computed(() => !standalone.value && !!installPrompt.value);
  const showIosGuide = computed(() => !standalone.value && isIos && !installPrompt.value);
  const install = async () => {
    const prompt = installPrompt.value;
    if (!prompt) return;
    await prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') installPrompt.value = undefined;
  };

  return { canInstall, showIosGuide, install };
}
