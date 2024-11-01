<template>
    <UserCell />
    <t-fab :icon="iconFunc" @click="onClick" :style="fabStyle" />

    <t-dialog v-model:visible="visible" title="设置玩家名称" confirm-btn="确定" cancel-btn="取消" @confirm="onAddPlayerConfirm()">
        <t-input v-model:value="newName" borderless class="dialog-input" clearable slot="content" placeholder="输入名称"
            placeholder-class="placeholder" />
    </t-dialog>

</template>

<script setup lang="ts">

import { saveConfig, useGameStore } from '@/stores/storage';
import type { Player } from '@/ts/common';
import { AddIcon } from 'tdesign-icons-vue-next';
import { h, ref } from 'vue';
import UserCell from '../../components/UserCell.vue';
import { Toast } from 'tdesign-mobile-vue';

const gameStore = useGameStore()

const iconFunc = () => h(AddIcon, { size: '30px' })
const fabStyle = "bottom: 80px; right: 5dvw"

const visible = ref(false)
const newName = ref('')

const onAddPlayerConfirm = () => {

    if (gameStore.playerListMap.has(newName.value)) {
        Toast.error('用户已存在！')
        return
    }

    var player: Player = {
        name: newName.value,
        seat: '',
        point: gameStore.startPoint,
        riichi: false
    }
    gameStore.setPlayer(player.name, player)
    saveConfig()
    newName.value = ''
}

const onClick = () => {
    visible.value = true
}

</script>
