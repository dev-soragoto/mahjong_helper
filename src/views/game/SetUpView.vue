<template>
    <t-navbar :title="$t('message.matchSetting')" :fixed="true"/>
    <div style="height: var(--td-navbar-height);"></div>
    <!-- TODO 三麻支持-->
    <t-cell-group theme="card">
        <t-cell v-for="(state, index) in playerState" :key="index" arrow :title="$t(titles[index])"
            :note="state.player.join('')" @click="state.show = true" />

        <t-popup v-for="(state, index) in playerState" :key="index" v-model="state.show" placement="bottom">
            <t-picker v-model="state.player" :columns="players" :title="$t(titles[index])"
                @change="(selectedPlayer: string[]) => onChange(selectedPlayer, index)" @confirm="onConfirm"
                @cancel="onCancel" />
        </t-popup>
        <t-navbar :title="$t('message.winds')" :fixed="false"/>
        <t-cell class="horizontal-selector">
            <t-radio-group class="box" :default-value="gameStore.gameType" borderless @change="roundChange">
                <t-radio :block="false" name="round" value="eastWind" :label="$t('message.tong')" />
                <t-radio :block="false" name="round" value="halfGame" :label="$t('message.half')" />
                <t-radio :block="false" name="round" value="fullGame" :label="$t('message.full')" />
            </t-radio-group>
        </t-cell>
        <t-navbar :title="$t('message.firstDealer')" :fixed="false"/>
        <t-cell class="horizontal-selector">
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
    z-index: 1000;
    --td-navbar-height: var(--td-navbar-height);
}
.t-cell-group .t-navbar {
    z-index: 0;
}
.t-fab {
    z-index:1000
}
.horizontal-selector {
    padding:0;
    height: 60px;
    .t-cell__note
    {
        height:100%;
        .t-radio-group {
            width:100%;
            height:100%;
            display: flex;
            justify-content: space-around;

            .t-radio {
                width: 100%;
                height: 100%;
                
                border-left:1px solid #eee;
                &:first-child{
                    border-left:0px;
                }
                .t-radio__icon {
                    position: absolute;
                    z-index: 1;
                    width:100%;
                    height: 100%;
                    margin: 0;
                    background-color: #e7e7e7;
                    &.t-radio__icon--checked{
                        background-color: #0052d9;
                    }
                    >*{
                        display:none !important;
                    }
                }
                .t-radio__content {
                    position: absolute;
                    z-index: 2;
                    left:0;
                    right:0;
                    top:0;
                    bottom:0;
                    margin:auto;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                }
                &:has(.t-radio__icon--checked)
                {
                    .t-radio__content span{
                        color:white;
                    }
                }
            }
        }
    }
    
}
</style>