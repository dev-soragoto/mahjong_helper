<template>
    <t-navbar :title="$t('message.matchSetting')" :fixed="true"/>
    <div style="height: var(--td-navbar-height);"></div>
    <t-row>
        <t-col span="16">
            <h2>{{ $t('message.matchPlayer') }}</h2>
        </t-col>
        <t-col span="8">
        <!-- TODO 三四麻切换
            <t-switch id="three-person-switch" v-model="currentMatchStore.threePerson" inactive-color="#faab0c">
                <template #node>
                    <div>
                      {{currentMatchStore.threePerson ? "三" : "四"}}
                    </div>
                </template>
            </t-switch>
        -->
        </t-col>
    </t-row>
    <t-cell-group theme="card">
        <t-cell v-for="(state, index) in playerState" :key="index" arrow :title="$t(titles[index])"
            :note="state.player.join('')" @click="state.show = true" />

        <t-popup v-for="(state, index) in playerState" :key="index" v-model="state.show" placement="bottom">
            <t-picker v-model="state.player" :columns="players" :title="$t(titles[index])"
                @change="(selectedPlayer: string[]) => onChange(selectedPlayer, index)" @confirm="onConfirm"
                @cancel="onCancel" />
        </t-popup>

        <t-cell :title="$t('message.winds')">
            <t-radio-group class="box" :default-value="gameStore.gameType" borderless @change="roundChange">
                <t-radio :block="false" name="round" value="eastWind" :label="$t('message.tong')" />
                <t-radio :block="false" name="round" value="halfGame" :label="$t('message.half')" />
            </t-radio-group>
        </t-cell>

        <t-cell :title="$t('message.firstDealer')">
            <t-radio-group class="box" :default-value="seats[gameStore.startSeat]" borderless @change="startSeatChange">
                <t-radio :block="false" name="startSeat" :value="seats[0]" :label="$t('message.self')" />
                <t-radio :block="false" name="startSeat" :value="seats[1]" :label="$t('message.right')" />
                <t-radio :block="false" name="startSeat" :value="seats[2]" :label="$t('message.across')" />
                <t-radio :block="false" name="startSeat" :value="seats[3]" :label="$t('message.left')" />
            </t-radio-group>
        </t-cell>
    </t-cell-group>
    <div style="height: var(--td-tab-bar-height);"></div>
    <t-fab :icon="iconFunc" @click="onClick" :style="fabStyle" />
</template>

<script lang="ts" setup>
import router from '@/router';
import { useGameStore, saveConfig } from '@/stores/storage';
import { PlayIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import type { PickerValue } from 'tdesign-mobile-vue/es/picker/type';
import { h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const iconFunc = () => h(PlayIcon, { size: '30px' });
const fabStyle = "bottom: 80px; right: 5dvw"

const gameStore = useGameStore()
const titles = ['message.self', 'message.right', 'message.across', 'message.left'];
const seats = ['self', 'next', 'across', 'previous']

const players = ref<{ label: string, value: string }[][]>([]);

const playerState = Array(4).fill(0).map(() => reactive({
    show: false,
    player: new Array<string>()
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

    // 加载 playerState
    for (var i = 0; i < 4; i++) {
        if (i > gameStore.seatList.length - 1) {
            break
        }
        playerState[i].player.push(gameStore.seatList[i])
    }
});

const onChange = (selectedPlayer: string[], index: number) => {
    for (let i = 0; i < playerState.length; i++) {
        if (selectedPlayer.join('') === playerState[i].player.join('') && i != index) {
            playerState[i].player = []
        }
    }

    var seatList: Array<string> = [];
    for (const state of playerState as { player: Array<string> }[]) {
        seatList.push(state.player.join(''));
    }

    gameStore.seatList = seatList

    saveConfig()
}

const onCancel = () => {
    playerState.forEach(state => {
        state.show = false;
        state.player = [];
    });
};

const onConfirm = (val: string[], context: number[]) => {
    playerState.forEach(state => state.show = false);
};

const onPick = (value: PickerValue[], context: any) => {

};


const roundChange = (value: any, context: { e: Event }) => {
    gameStore.gameType = value;

    saveConfig();
};

const startSeatChange = (value: any, context: { e: Event }) => {
    gameStore.startSeat = seats.indexOf(value);

    saveConfig()
};


const onClick = () => {
    for (const player of playerState as { player: Array<string> }[]) {
        if (player.player.join('') === '') {
            Toast.error(t('message.playerNotChooseSeat'));
            return;
        }
    }
    for (let i = 0; i < 4; i++) {
        let player = gameStore.getSeat(i)
        player.point = gameStore.startPoint
        gameStore.setPlayer(player.name, player)
    }

    router.push('/game');
};
</script>

<style>
h2 {
  color: var(--td-text-color-primary);
  margin: 16px 32px 0px 32px;
}
.t-navbar {
    z-index: 9999;
    --td-navbar-height: var(--td-navbar-height);
}
</style>