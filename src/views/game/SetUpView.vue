<template>
    <t-cell-group>
        <t-cell v-for="(state, index) in playerState" :key="index" arrow :title="titles[index]"
            :note="state.player.join('')" @click="state.show = true" />

        <t-popup v-for="(state, index) in playerState" :key="index" v-model="state.show" placement="bottom">
            <t-picker v-model="state.player" :columns="players" @change="onChange" @confirm="onConfirm" @cancel="onCancel" />
        </t-popup>

        <t-cell title="局数" class="no-hover">
            <t-radio-group class="box" :default-value="gameStore.gameType" borderless @change="roundChange">
                <t-radio :block="false" name="round" value="eastWind" label="东风战" />
                <t-radio :block="false" name="round" value="halfGame" label="半庄战" />
            </t-radio-group>
        </t-cell>

        <t-cell title="起家" class="no-hover">
            <t-radio-group class="box" default-value="self" borderless @change="startSeatChange">
                <t-radio :block="false" name="startSeat" :value="seats[0]" label="自家" />
                <t-radio :block="false" name="startSeat" :value="seats[1]" label="下家" />
                <t-radio :block="false" name="startSeat" :value="seats[2]" label="对家" />
                <t-radio :block="false" name="startSeat" :value="seats[3]" label="上家" />
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
import { Toast } from 'tdesign-mobile-vue';
import { h, onMounted, reactive, ref } from 'vue';

const gameStore = useGameStore()
const titles = ['自家', '下家', '对家', '上家'];
const seats = ['self', 'next', 'across', 'previous']

const players = ref<{ label: string, value: string }[][]>([]);

const playerState = Array(4).fill(0).map(() => reactive({
    show: false,
    player: []
}));

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

const onChange = (selectedPlayer: string[]) => {
    players.value = players.value.map(group => group.filter(player => !selectedPlayer.includes(player.value)));
    var seatList: Array<string> = [];
    for (const state of playerState as { player: Array<string> }[]) {
        seatList.push(state.player.join(''));
    }

    gameStore.seatList = seatList
    console.log(gameStore.seatList)
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
    gameStore.gameType = value;
};

const startSeatChange = (value: any, context: { e: Event }) => {
    console.log(value, context);
    gameStore.startSeat = titles.indexOf(value);
};

const iconFunc = () => () => h(PlayIcon, { size: '30px' });
const fabStyle = "bottom: 80px; right: 5vw"

const onClick = () => {
    for (const player of gameStore.seatList as string[]) {
        if (player === '') {
            Toast.error('有玩家未选择座位！');
            return;
        }
    }
    router.push('/game');
};
</script>

<style>
.no-hover {
    background-color: #fff !important;
}
</style>