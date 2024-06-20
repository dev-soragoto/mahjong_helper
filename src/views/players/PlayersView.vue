<template>
    <UserCell />
    <t-fab :buttonProps="{ style: 'heigth: 12vw' }" :icon="iconFunc" @click="onClick"
        style="bottom: 8vh; right: 5vw;" />
</template>


<script setup lang="ts">

import UserCell from '../../components/UserCell.vue'
import { h } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';

const iconFunc = () => h(AddIcon, { size: '30px' });
const onClick = () => {
    console.log('click Fab');
};


</script>
