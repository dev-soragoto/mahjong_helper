<template>
    <t-cell title="西入" description="All last结束时,如果四家点数都不到返点,游戏继续">
        <template #rightIcon>
            <t-switch :value="checked.continuingIntoWest"
                @change="(val: boolean) => onChange('continuingIntoWest', val)"></t-switch>
        </template>
    </t-cell>

    <t-cell title="原点" v-bind:description="startPoint.value" @click="showStartPointInput.on = true" />
        <template>
            <t-dialog v-model:visible="showStartPointInput.on" title="设置原点" confirm-btn="确定" cancel-btn="取消" @confirm="onChangeStartPoint" bind:cancel="closeDialog">
                <t-input v-model="startPointInput" type="number" borderless class="dialog-input" clearable slot="content" placeholder="输入点数" placeholder-class="placeholder"/>
            </t-dialog>
        </template>
    <t-cell title="返点" v-bind:description="returnPoint.value" @click="showReturnPointInput.on = true" />
        <template>
            <t-dialog v-model:visible="showReturnPointInput.on" title="设置返点" confirm-btn="确定" cancel-btn="取消" @confirm="onChangeReturnPoint" bind:cancel="closeDialog">
                <t-input v-model="returnPointInput" type="number" borderless class="dialog-input" clearable slot="content" placeholder="输入点数" placeholder-class="placeholder"/>
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
</template>

<script lang="ts" setup>
import { useGameStore } from '@/stores/storage';
import { reactive, ref } from 'vue';

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
    continuingIntoWest: true,
    bankruptcy: true,
    negativeRiichi: false,
});

const onChange = (key: keyof CheckedObject, val: boolean) => {
    checked[key] = val;
    gameStore.setConfig(
        checked.continuingIntoWest, 
        checked.bankruptcy,
        checked.negativeRiichi,
        startPoint.value,
        returnPoint.value
    )
};

const onChangeStartPoint = () => {
    startPoint.value = (String)(startPointInput.value)
    gameStore.setConfig(
        checked.continuingIntoWest, 
        checked.bankruptcy,
        checked.negativeRiichi,
        startPoint.value,
        returnPoint.value
    )
    showStartPointInput.value.on = false
}

const onChangeReturnPoint = () => {
    returnPoint.value = (String)(returnPointInput.value)
    gameStore.setConfig(
        checked.continuingIntoWest, 
        checked.bankruptcy,
        checked.negativeRiichi,
        startPoint.value,
        returnPoint.value
    )
    showReturnPointInput.value.on = false
}



</script>