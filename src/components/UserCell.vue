<template>
    <t-swipe-cell v-for="(item, index) of gameStore.playerList" :key="gameStore.playerListRef[index]"
        :right="cellEvent(item)" @touchstart.stop @touchend.stop>
        <t-cell v-bind:title="item.name"></t-cell>
    </t-swipe-cell>
    <div style="height: var(--td-tab-bar-height);"></div>
    <t-dialog v-for="(item, index) of gameStore.playerList" :key="gameStore.playerListRef[index]"
        v-model:visible="gameStore.getPlayerRef(item.name).visible" :title="$t('message.setPlayerName')" :confirm-btn="$t('message.confirm')" :cancel-btn="$t('message.cancel')"
        @confirm="onChangePlayerName(item)" @cancel="closeDialog(item)">
        <t-input v-model:value="gameStore.playerListRef[index].inputModel" borderless class="dialog-input" clearable
            slot="content" :placeholder="$t('message.enterPlayerName')" placeholder-class="placeholder" />
    </t-dialog>
</template>

<script setup lang="ts">

import { reactive, h } from 'vue';
import { Edit1Icon, DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import { useGameStore, saveConfig } from '@/stores/storage'
import type { Player } from '@/ts/common'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const gameStore = useGameStore()

const handleEdit = (item: Player) => {
    gameStore.setPlayerRef(item.name, true)
};

const handleDelete = (item: Player) => {
    gameStore.deletePlayer(item.name)
    Toast.success(t('message.deleteSuccess'));

    saveConfig()
};

const onChangePlayerName = (item: Player) => {
    let mapIndex = gameStore.playerListMap.get(item.name)
    if (mapIndex == undefined) {
        return
    }

    if (gameStore.playerListRef[mapIndex].inputModel === '') {
        Toast.error(t('message.playerNameEmpty'))
        return
    }

    var player: Player = {
        name: gameStore.playerListRef[mapIndex].inputModel,
        seat: item.seat,
        point: item.point,
        riichi: item.riichi
    }
    gameStore.playerListRef[mapIndex].inputModel = ''

    gameStore.setPlayerRef(item.name, false)
    if (gameStore.playerListMap.has(player.name)) {
        Toast.error(t('message.usernameExisted'))
        return
    }
    if (gameStore.setPlayer(item.name, player)) {
        Toast.success(t('message.editSuccess'));
    }
    else {
        Toast.error(t('message.editFailed'))
    }

    saveConfig()
}

const closeDialog = (item: Player) => {
    gameStore.setPlayerRef(item.name, false)
}

const editIcon = h(Edit1Icon, { size: '20px' });
const delIcon = h(DeleteIcon, { size: '20px' });

const cellEvent = (item: Player) => {
    return reactive(
        [
            { text: t("message.edit"), icon: editIcon, className: 'edit-btn', onClick: () => handleEdit(item) },
            { text: t('message.delete'), icon: delIcon, className: 'delete-btn', onClick: () => handleDelete(item) },
        ]
    )
};
</script>

<style>
.edit-btn {
    background-color: #ed7b2f;
}

.delete-btn {
    background-color: #e34d59;
}
</style>
