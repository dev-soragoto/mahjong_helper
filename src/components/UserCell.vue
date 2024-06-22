<template>
  <t-swipe-cell :right="cellEvent" @touchstart.stop @touchend.stop>
    <t-cell title="牌搭子1"></t-cell>
  </t-swipe-cell>
  <t-swipe-cell :right="cellEvent" @touchstart.stop @touchend.stop>
    <t-cell title="牌搭子2"></t-cell>
  </t-swipe-cell>
  <t-swipe-cell :right="cellEvent" @touchstart.stop @touchend.stop>
    <t-cell title="牌搭子3"></t-cell>
  </t-swipe-cell>
  <t-swipe-cell :right="cellEvent" @touchstart.stop @touchend.stop>
    <t-cell title="牌搭子4"></t-cell>
  </t-swipe-cell>
</template>

<script setup lang="ts">

import { reactive, h } from 'vue';
import { Edit1Icon, DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const handleEdit = () => {
  Toast.success(`编辑成功`);
};

const handleDelete = () => {
  Toast.success(`删除成功`);
};

const editIcon = h(Edit1Icon, { size: '20px' });
const delIcon = h(DeleteIcon, { size: '20px' });

const cellEvent = reactive(
  [
    { text: '编辑', icon: editIcon, className: 'edit-btn', onClick: handleEdit },
    { text: '删除', icon: delIcon, className: 'delete-btn', onClick: handleDelete },
  ]
);
</script>

<style>
.edit-btn {
  background-color: #ed7b2f;
}

.delete-btn {
  background-color: #e34d59;
}
</style>
