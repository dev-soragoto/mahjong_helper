<template>
    <t-cell-group>
        <t-cell v-for="(state, index) in playerState" :key="index" arrow :title="titles[index]"
            :note="state.player.join('')" @click="state.show = true" />

        <t-popup v-for="(state, index) in playerState" :key="index" v-model="state.show" placement="bottom">
            <t-picker v-model="state.player" :columns="players" @change="onChange" @confirm="onConfirm" @cancel="onCancel" />
        </t-popup>

        <t-cell title="局数" class="no-hover">
            <t-radio-group class="box" default-value="halfGame" borderless @change="roundChange">
                <t-radio :block="false" name="round" value="eastWind" label="东风战" />
                <t-radio :block="false" name="round" value="halfGame" label="半庄战" />
            </t-radio-group>
        </t-cell>

        <t-cell title="起家" class="no-hover">
            <t-radio-group class="box" default-value="self" borderless @change="startPlayerChange">
                <t-radio :block="false" name="startPlayer" value="self" label="自家" />
                <t-radio :block="false" name="startPlayer" value="next" label="下家" />
                <t-radio :block="false" name="startPlayer" value="across" label="对家" />
                <t-radio :block="false" name="startPlayer" value="previous" label="上家" />
            </t-radio-group>
        </t-cell>
    </t-cell-group>

    <t-fab :icon="iconFunc" @click="onClick" :style="fabStyle" />
</template>

<script lang="ts" setup>
import router from '@/router';
import { useGameStore } from '@/stores/storage';
import { PlayIcon } from 'tdesign-icons-vue-next';
import type { PickerValue } from 'tdesign-mobile-vue/es/picker/type';
import { h, onMounted, reactive, ref } from 'vue';

const gameStore = useGameStore()
const titles = ['自家', '下家', '对家', '上家'];


const players = ref<{ label: string, value: string }[][]>([]);

onMounted(() => {
    var result: { label: string, value: string }[][] = [[]];
    for (const player of gameStore.playerList as { name: string }[]) {
        result[0].push({
            label: player.name,
            value: player.name
        });
    }
    players.value = result;
});

const playerState = Array(4).fill(0).map(() => reactive({
    show: false,
    player: []
}));

const onChange = (selectedPlayer: string[]) => {
    players.value = players.value.map(group => group.filter(player => !selectedPlayer.includes(player.value)));
}

const onCancel = () => {
    playerState.forEach(state => {
        state.show = false;
        state.player = [];
    });
};

const onConfirm = (val: string[], context: number[]) => {
    console.log(val);
    console.log('context', context);
    playerState.forEach(state => state.show = false);
};

const onPick = (value: PickerValue[], context: any) => {
    console.log('value', value);
    console.log('context', context);
};


const roundChange = (value: any, context: { e: Event }) => {
    console.log(value, context);
};

const startPlayerChange = (value: any, context: { e: Event }) => {
    console.log(value, context);
};

const iconFunc = () => () => h(PlayIcon, { size: '30px' });
const fabStyle = "bottom: 80px; right: 5vw"

const onClick = () => {
    router.push('/game');
};
</script>

<style>
.no-hover {
    background-color: #fff !important;
}
</style>