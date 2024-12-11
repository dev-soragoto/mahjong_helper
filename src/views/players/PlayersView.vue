<template> 
    <t-navbar :title="$t('message.player')" :fixed="true"/>
    <div style="height: var(--td-navbar-height);"></div>
    <t-cell-group theme="card">
        <UserCell />
    </t-cell-group>
    <div style="height: var(--td-tab-bar-height);"></div>
    <t-fab :icon="iconFunc" @click="onClick" :style="fabStyle" />

    <t-dialog v-model:visible="visible" :title="$t('message.setPlayerName')" :confirm-btn="$t('message.confirm')" :cancel-btn="$t('message.cancel')" @confirm="onAddPlayerConfirm()">
        <t-input v-model:value="newName" borderless class="dialog-input" clearable slot="content" :placeholder="$t('message.enterPlayerName')"
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const gameStore = useGameStore()

const iconFunc = () => h(AddIcon, { size: '30px' })
const fabStyle = "bottom: 80px; right: 5dvw"

const visible = ref(false)
const newName = ref('')

const onAddPlayerConfirm = () => {

    if (newName.value === '') {
        Toast.error(t('message.playerNameEmpty'))
        return
    }

    if (gameStore.playerListMap.has(newName.value)) {
        Toast.error(t('message.usernameExisted'))
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
