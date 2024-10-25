<template>
    <UserCell />
    <t-fab :icon="iconFunc" @click="onClick" :style="fabStyle" />
</template>

<script setup lang="ts">

import { useGameStore, saveConfig } from '@/stores/storage';
import type { Player } from '@/ts/common';
import { genNonDuplicateID } from '@/ts/common';
import { AddIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';
import UserCell from '../../components/UserCell.vue';

const gameStore = useGameStore()

const iconFunc = () =>  h(AddIcon, { size: '30px' })
const fabStyle = "bottom: 80px; right: 5dvw"

const onClick = () => {
    if (gameStore.count >= 4) {
        return
    }
    var player: Player = {
        name: '牌搭子' + genNonDuplicateID(),
        seat: '',
        point: gameStore.startPoint,
        riichi: false
    }
    gameStore.setPlayer(player.name, player)

    saveConfig()
};


</script>
