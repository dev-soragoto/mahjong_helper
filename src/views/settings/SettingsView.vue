<template>
    <t-cell title="西入" description="All last结束时,如果四家点数都不到返点,游戏继续">
        <template #rightIcon>
            <t-switch :value="checked.continuingIntoWest"
                @change="(val: boolean) => onChange('continuingIntoWest', val)"></t-switch>
        </template>
    </t-cell>

    <t-cell title="原点" description="25000" />
    <t-cell title="返点" description="30000" />

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
import { reactive, ref } from 'vue';

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
};

</script>