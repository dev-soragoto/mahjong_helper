<template>
    <t-cell-group theme="card">
        <t-cell arrow :title="$t('message.language')" :note="languageState.language.join('')" @click="languageState.show = true" />
        <t-popup v-model="languageState.show" placement="bottom">
                    <t-picker 
                        v-model="languageState.language" 
                        :columns="()=>{return Object.entries(Language).map(([label, value]) => {return {label:value, value:value}})}"
                        :title="$t('message.language')"
                        @confirm="onLanguagePickerConfirm"
                        @cancel="languageState.show = false" 
                    />
                    </t-popup>
        <t-cell :title="$t('message.enteringWest')" :description="$t('describe.enteringWest')">
            <template #rightIcon>
                <t-switch :value="checked.continuingIntoWest"
                    @change="(val: boolean) => onChange('continuingIntoWest', val)"></t-switch>
            </template>
        </t-cell>

        <t-cell :title="$t('message.initialScore')" v-bind:description="startPoint.value" @click="showStartPointInput.on = true" />
            <template>
                <t-dialog v-model:visible="showStartPointInput.on" :title="$t('message.setInitialScore')" :confirm-btn="$t('message.confirm')" :cancel-btn="$t('message.cancel')"
                    @confirm="onChangeStartPoint" bind:cancel="closeDialog">
                    <t-input v-model="startPointInput" type="number" borderless class="dialog-input" clearable slot="content"
                        :placeholder="$t('message.enterPoint')" placeholder-class="placeholder" />
                </t-dialog>
            </template>
        <t-cell :title="$t('message.targetScore')" v-bind:description="returnPoint.value" @click="showReturnPointInput.on = true" />
        <template>
            <t-dialog v-model:visible="showReturnPointInput.on" :title="$t('message.setTargetScore')" :confirm-btn="$t('message.confirm')" :cancel-btn="$t('message.cancel')"
                @confirm="onChangeReturnPoint" bind:cancel="closeDialog">
                <t-input v-model="returnPointInput" type="number" borderless class="dialog-input" clearable slot="content"
                    :placeholder="$t('message.enterPoint')" placeholder-class="placeholder" />
            </t-dialog>
        </template>

        <t-cell :title="$t('message.bankruptcy')" :description="$t('describe.bankruptcy')">
            <template #rightIcon>
                <t-switch :value="checked.bankruptcy" @change="(val: boolean) => onChange('bankruptcy', val)"></t-switch>
            </template>
        </t-cell>

        <t-cell :title="$t('message.negativeRiichi')" :description="$t('describe.negativeRiichi')">
            <template #rightIcon>
                <t-switch :value="checked.negativeRiichi"
                    @change="(val: boolean) => onChange('negativeRiichi', val)"></t-switch>
            </template>
        </t-cell>

        <t-cell :title="$t('message.tips')" :description="$t('describe.tips')" />

        <t-cell :title="$t('message.goGithub')"  :description="$t('describe.goGithub')" @click="openGithub" />

        <t-cell :title="$t('message.contributors')">
            <div class="contributors">
                <div v-for="contributor in contributors" :key="contributor.id" class="contributor">
                    <a :href="contributor.html_url" target="_blank">
                        <img :src="contributor.avatar_url" :alt="contributor.login" class="avatar" />
                    </a>
                </div>
            </div>
        </t-cell>
    </t-cell-group>

    <div style="height: var(--td-tab-bar-height);"></div>
</template>

<script lang="ts" setup>
import { saveConfig, useGameStore } from '@/stores/storage';
import { Toast } from 'tdesign-mobile-vue';
import { onMounted, reactive, ref } from 'vue';
import { Language} from '@/ts/common'
import { useI18n } from 'vue-i18n';

const gameStore = useGameStore();
const {locale, t} = useI18n();
//设置逻辑
const languageState = reactive({
    show: false,
    language: [gameStore.language as string]
});

const startPoint = reactive({
    value: (String)(gameStore.startPoint)
})
const returnPoint = reactive({
    value: (String)(gameStore.returnPoint)
})

const showStartPointInput = ref({
    on: false
})
const showReturnPointInput = ref({
    on: false
})

const startPointInput = ref<number>(25000)
const returnPointInput = ref<number>(30000)


interface CheckedObject {
    continuingIntoWest: boolean;
    bankruptcy: boolean;
    negativeRiichi: boolean;
}

const checked: CheckedObject = reactive({
    continuingIntoWest: gameStore.continuingIntoWest,
    bankruptcy: gameStore.bankruptcy,
    negativeRiichi: gameStore.negativeRiichi,
});

const onLanguagePickerConfirm = (selectedOptions : Language[]) => {
        languageState.show = false;
        languageState.language = selectedOptions;
        gameStore.setLanguage(selectedOptions[0], locale);
    };

const onChange = (key: keyof CheckedObject, val: boolean) => {
    checked[key] = val;
    gameStore.setConfig(
        checked.continuingIntoWest,
        checked.bankruptcy,
        checked.negativeRiichi,
        Number(startPoint.value),
        Number(returnPoint.value)
    )

    saveConfig()
};

const onChangeStartPoint = () => {
    if (startPointInput.value % 100 != 0) {
        Toast.error(t('message.enterMultiples100'))
        return
    }
    if (startPointInput.value % 100 == null) {
        Toast.error(t('message.enterEmpty'))
        return
    }

    startPoint.value = (String)(startPointInput.value)
    gameStore.setConfig(
        checked.continuingIntoWest,
        checked.bankruptcy,
        checked.negativeRiichi,
        Number(startPoint.value),
        Number(returnPoint.value)
    )
    showStartPointInput.value.on = false
    saveConfig()
}

const onChangeReturnPoint = () => {
    returnPoint.value = (String)(returnPointInput.value)
    gameStore.setConfig(
        checked.continuingIntoWest,
        checked.bankruptcy,
        checked.negativeRiichi,
        Number(startPoint.value),
        Number(returnPoint.value)
    )
    showReturnPointInput.value.on = false
    saveConfig()
}

function openGithub() {
  window.open('https://github.com/dev-soragoto/mahjong_helper', '_blank');
}


const contributors = reactive<any[]>([]);

onMounted(() => {
    getContributors()
})

async function getContributors() {
    try {
        const response = await fetch('https://api.github.com/repos/dev-soragoto/mahjong_helper/contributors');
        if (!response.ok) {
            throw new Error(t('message.netError'));
        }
        const data = await response.json();
        contributors.push(...data);
    } catch (error) {
        console.error(t('message.getContributorsFailed') + ':', error);
    }
}



</script>


<style>
.contributors {
    display: flex;
    flex-wrap: wrap;
}

.contributor {
    margin: 1px;
    text-align: center;
}

.avatar {
    margin-left: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.t-cell-group {
    margin: 16px;
}
</style>