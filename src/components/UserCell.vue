<template>
  <t-swipe-cell v-for="(item, index) of gameStore.playerList" :key="gameStore.playerListRef[index]" :right="cellEvent(item)" @touchstart.stop @touchend.stop>
      <t-cell v-bind:title="item.name"></t-cell>
  </t-swipe-cell>
  <t-dialog v-for="(item, index) of gameStore.playerList" :key="gameStore.playerListRef[index]" v-model:visible="gameStore.getPlayerRef(item.name).visible" title="设置玩家名称" confirm-btn="确定" cancel-btn="取消" @confirm="onChangePlayerName(item)" @cancel="closeDialog(item)">
      <t-input v-model:value="gameStore.playerListRef[index].inputModel" borderless class="dialog-input" clearable slot="content" placeholder="输入名称" placeholder-class="placeholder"/>
  </t-dialog>
</template>

<script setup lang="ts">

import { reactive, h } from 'vue';
import { Edit1Icon, DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import { useGameStore, saveConfig } from '@/stores/storage'
import { Player } from '@/ts/common'

const gameStore = useGameStore()

const handleEdit = (item: Player) => {
  gameStore.setPlayerRef(item.name, true)
};

const handleDelete = (item: Player) => {
  gameStore.deletePlayer(item.name)
  Toast.success(`删除成功`);

  saveConfig()
};

const onChangePlayerName = (item: Player) => {
  var player = new Player()
  player.name = gameStore.playerListRef[gameStore.playerListMap.get(item.name)].inputModel
  gameStore.playerListRef[gameStore.playerListMap.get(item.name)].inputModel = ''
  player.seat = item.seat
  player.point = item.point
  player.riichi = item.riichi

  gameStore.setPlayerRef(item.name, false)
  if(gameStore.setPlayer(item.name, player)) {
    Toast.success(`编辑成功`);
  }
  else {
    Toast.error('用户已存在！')
  }

  saveConfig()
}

const closeDialog = (item: Player) => {
  gameStore.setPlayerRef(item.name, false)
}

const editIcon = h(Edit1Icon, { size: '20px' });
const delIcon = h(DeleteIcon, { size: '20px' });

const cellEvent = (item) => {
  return reactive(
  [
    { text: '编辑', icon: editIcon, className: 'edit-btn', onClick: () => handleEdit(item) },
    { text: '删除', icon: delIcon, className: 'delete-btn', onClick: () => handleDelete(item)},
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
