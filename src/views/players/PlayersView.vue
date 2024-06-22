<template>
    <UserCell />
    <t-fab :icon="iconFunc" @click="onClick" :style="fabStyle" />
</template>

<script setup lang="ts">

import UserCell from '../../components/UserCell.vue'
import { h, type VNode } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';

const iconFunc = () => () =>  h(AddIcon, { size: '30px' });
const fabStyle = "bottom: 80px; right: 5vw"

const onClick = () => {
    console.log('click Fab');
};


</script>
