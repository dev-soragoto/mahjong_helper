<template>
    <t-collapse expand-mutex :value="values" @change="handleChange">
        <t-swipe-cell v-for="i in 4" :key="i" :value="i" :right="cellEvent" @touchstart.stop @touchend.stop>
            <t-collapse-panel :value="i" header="2024-02-30 11:45:14" header-right-content="牌搭子1 获胜">
                <div class="content">
                    <t-table row-key="index" :data="data" :columns="columns" :show-header="showHeader"
                        cell-empty-content="-" @row-click="handleRowClick">
                    </t-table>
                </div>
            </t-collapse-panel>
        </t-swipe-cell>
    </t-collapse>
</template>


<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';




const values = ref([0]);
const handleChange = (val: number[]) => {
    values.value = val;
};


const data: any[] = [];
data.push({
    index: 1,
    first: '74000',
    second: '26000',
    third: '24000',
    fourth: '-24000',
});

const showHeader = ref(true);

const columns = ref([
    {
        colKey: 'first',
        title: '牌搭子1',
        ellipsis: true,
    },
    {
        colKey: 'second',
        title: '牌搭子2',
        ellipsis: true,
    },

    {
        colKey: 'third',
        title: '牌搭子3',
        ellipsis: true,
    },
    {
        colKey: 'fourth',
        title: '牌搭子4',
        ellipsis: true,
    },

]);

const handleRowClick = (e: any) => {
    console.log('row-cliek=====', e);
};

const handleDelete = () => {
    Toast.success(`删除成功`);
};


const delIcon = h(DeleteIcon, { size: '20px' });

const cellEvent = reactive(
    [
        { text: '删除', icon: delIcon, className: 'delete-btn', onClick: handleDelete },
    ]
);

</script>
