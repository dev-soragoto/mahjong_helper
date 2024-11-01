<template>
    <t-collapse expand-mutex :value="values" @change="handleChange">
        <t-swipe-cell v-for="i in historyDataList.length" :key="i - 1" :value="i - 1" :right="cellEvent(i - 1)"
            @touchstart.stop @touchend.stop>
            <t-collapse-panel :value="i - 1" :header="timeList[i - 1]"
                :header-right-content="columns[i - 1][0].title + ' 获胜'">
                <div class="content">
                    <t-table row-key="index" :data="data[i - 1]" :columns="columns[i - 1]" :show-header="showHeader"
                        cell-empty-content="-" @row-click="handleRowClick">
                    </t-table>
                </div>
            </t-collapse-panel>
        </t-swipe-cell>
    </t-collapse>
    <div style="height: var(--td-tab-bar-height);"></div>
</template>


<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import type { Ref } from "vue";
import { DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import { readHistory, setHistory } from '@/stores/storage';
import type { HistoryData } from '@/stores/storage';

const values = ref([0]);
const handleChange = (val: number[]) => {
    values.value = val;
};

let historyDataList: HistoryData[] = reactive(readHistory())
let timeList: string[] = []
let data: any[][] = [];
let columns: Ref<{ colKey: string, title: string, ellipsis: boolean, }[][]> = ref([])

loadData()

function loadData() {
    historyDataList = reactive(readHistory())
    timeList = []
    data = []
    columns.value = []
    for (let i = 0; i < historyDataList.length; i++) {
        timeList.push(new Date(historyDataList[i].timeStamp).toLocaleString().replace('/', '-').replace('/', '-'))
        data.push([{
            index: 1,
            first: historyDataList[i].record[0][1],
            second: historyDataList[i].record[1][1],
            third: historyDataList[i].record[2][1],
            fourth: historyDataList[i].record[3][1],
        }])

        columns.value.push([
            {
                colKey: 'first',
                title: historyDataList[i].record[0][0],
                ellipsis: true,
            },
            {
                colKey: 'second',
                title: historyDataList[i].record[1][0],
                ellipsis: true,
            },

            {
                colKey: 'third',
                title: historyDataList[i].record[2][0],
                ellipsis: true,
            },
            {
                colKey: 'fourth',
                title: historyDataList[i].record[3][0],
                ellipsis: true,
            },

        ])
    }
}

const showHeader = ref(true);


const handleRowClick = (e: any) => {
};

const handleDelete = (index: number) => {
    historyDataList.splice(index, 1)
    setHistory(historyDataList)
    loadData()

    Toast.success(`删除成功`);
};


const delIcon = h(DeleteIcon, { size: '20px' });

const cellEvent = (index: number) => {
    return reactive(
        [
            { text: '删除', icon: delIcon, className: 'delete-btn', onClick: () => handleDelete(index) },
        ]
    )
}

</script>
