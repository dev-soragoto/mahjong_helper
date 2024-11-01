<template>
    <t-cell title="西入" description="All last结束时,如果四家点数都不到返点,游戏继续">
        <template #rightIcon>
            <t-switch :value="checked.continuingIntoWest"
                @change="(val: boolean) => onChange('continuingIntoWest', val)"></t-switch>
        </template>
    </t-cell>

    <t-cell title="原点" v-bind:description="startPoint.value" @click="showStartPointInput.on = true" />
    <template>
        <t-dialog v-model:visible="showStartPointInput.on" title="设置原点" confirm-btn="确定" cancel-btn="取消"
            @confirm="onChangeStartPoint" bind:cancel="closeDialog">
            <t-input v-model="startPointInput" type="number" borderless class="dialog-input" clearable slot="content"
                placeholder="输入点数" placeholder-class="placeholder" />
        </t-dialog>
    </template>
    <t-cell title="返点" v-bind:description="returnPoint.value" @click="showReturnPointInput.on = true" />
    <template>
        <t-dialog v-model:visible="showReturnPointInput.on" title="设置返点" confirm-btn="确定" cancel-btn="取消"
            @confirm="onChangeReturnPoint" bind:cancel="closeDialog">
            <t-input v-model="returnPointInput" type="number" borderless class="dialog-input" clearable slot="content"
                placeholder="输入点数" placeholder-class="placeholder" />
        </t-dialog>
    </template>

    <t-cell title="击飞" description="一家点数为负游戏结束">
        <template #rightIcon>
            <t-switch :value="checked.bankruptcy" @change="(val: boolean) => onChange('bankruptcy', val)"></t-switch>
        </template>
    </t-cell>

    <t-cell title="负分立直" description="当分数<1000时(即立直后负分)允许立直">
        <template #rightIcon>
            <t-switch :value="checked.negativeRiichi"
                @change="(val: boolean) => onChange('negativeRiichi', val)"></t-switch>
        </template>
    </t-cell>

    <t-cell title="小提示" description="玩家和历史界面可以左滑编辑/删除，所有界面都可以左右滑切换目录。" />

    <t-cell title="前往github仓库"  description="听话，让我看看！" @click="openGithub" />

    <t-cell title="开发者们">
        <div class="contributors">
            <div v-for="contributor in contributors" :key="contributor.id" class="contributor">
                <a :href="contributor.html_url" target="_blank">
                    <img :src="contributor.avatar_url" :alt="contributor.login" class="avatar" />
                </a>
            </div>
        </div>
    </t-cell>

    <div style="height: var(--td-tab-bar-height);"></div>
</template>

<script lang="ts" setup>
import { saveConfig, useGameStore } from '@/stores/storage';
import { Toast } from 'tdesign-mobile-vue';
import { onMounted, reactive, ref } from 'vue';

const gameStore = useGameStore()

//设置逻辑
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
        Toast.error('请输入100的倍数！')
        return
    }
    if (startPointInput.value % 100 == null) {
        Toast.error('输入不能为空！')
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
            throw new Error('网络响应错误');
        }
        const data = await response.json();
        contributors.push(...data);
    } catch (error) {
        console.error('获取贡献者列表失败:', error);
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
</style>