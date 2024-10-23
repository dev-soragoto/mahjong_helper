<template>
    <div style="height: 90vh; width: 100vw; position: absolute; margin: auto; 
        top: 0; left: 0; right: 0; background-color: #fcbad3;">

        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: blanchedalmond; display: table; border-radius: 3vmin">
            <p class="title"><strong>{{ kyokuList[currentKyoku] }}</strong></p>
            <p class="text"><strong>{{ honba }}本场</strong></p>
            <p class="text"><strong>{{ kyoutaku * 1000 }}供托</strong></p>
        </div>

        <div style="position: absolute; margin: auto; left: 0; right: 0; bottom: 2vmin;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin;">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(0).seat }} {{ gameStore.getSeat(0).point }}</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(0).name }}</strong></p>
        </div>

        <div style="position: absolute; margin: auto; top: 2vmin; left: 0; right: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin; transform: rotate(180deg);">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(2).seat }} {{ gameStore.getSeat(2).point }}</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(2).name }}</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  right: -5.5vmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin; transform: rotate(270deg);">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(1).seat }} {{ gameStore.getSeat(1).point }}</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(1).name }}</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  left: -5.5vmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin; transform: rotate(90deg);">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(3).seat }} {{ gameStore.getSeat(3).point }}</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>{{ gameStore.getSeat(3).name }}</strong></p>
        </div>

    </div>

    <div style="height: 10vh; width: 100vw; position: absolute; margin: auto; 
        bottom: 0; left: 0; right: 0; background-color: #aa96da;">
        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: transparent; display: table;">
            <t-button class="actionButton" theme="light" @click="onTsumo">自摸</t-button>
            <t-button class="actionButton" theme="light" @click="onRon">荣和</t-button>
            <t-button class="actionButton" theme="light" @click="onRyuukyoku">流局</t-button>
            <t-button class="actionButton" theme="light" @click="onEdit">编辑</t-button>
            <t-button class="actionButton" theme="light" @click="onRevoke">撤销</t-button>
        </div>

    </div>

    <t-dialog v-model:visible="winState.tsumo">
        <t-picker v-model="winState.fanfu" :columns="fanfuList" @change="onTsumoChange" @cancel="onTsumoCancel" />
        <t-radio-group :default-value="winner" @change="onTsumRadioGroupChange">
            <t-radio v-for="playerName of gameStore.seatList" name="winner" :value="playerName" :label="playerName" />
        </t-radio-group>
    </t-dialog>

    <t-dialog v-model:visible="winState.ron">
        <t-picker v-model="winState.fanfu" :columns="fanfuList" @change="onRonChange" @cancel="onRonCancel" />
        <t-checkbox-group v-model:value="winners" :options="options" @change="onRonCheckboxGroupChange" />
        <t-radio-group :default-value="loser" @change="onRonRadioGroupChange">
            <t-radio v-for="playerName of gameStore.seatList" name="lose" :value="playerName" :label="playerName" />
        </t-radio-group>
    </t-dialog>

    <t-dialog v-model:visible="winState.ryuukyoku" title="选择听牌玩家" confirm-btn="确定" cancel-btn="取消" @confirm="onRyuukyokuConfirm" @cancel="onRyuukyokuCancel">
        <t-checkbox-group v-model:value="winners" :options="options" @change="onRyuukyokuCheckboxGroupChange" />
    </t-dialog>

    <t-dialog v-model:visible="editState.on">
        <t-picker v-model="editState.currentKyoku" :columns="kyokuListOptions" @change="onEditChange" @cancel="onEditCancel" />
        <t-row>
            <t-col span="12">
                <a>本场: </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.honba" class="dialog-input" clearable slot="content" placeholder="输入本场" placeholder-class="placeholder"/>
            </t-col>
        </t-row>
        <t-row>
            <t-col span="12">
                <a>供托(x1000): </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.honba" class="dialog-input" clearable slot="content" placeholder="输入供托数" placeholder-class="placeholder"/>
            </t-col>
        </t-row>
        <t-row v-for="(playerName, index) of gameStore.seatList" :key="index">
            <t-col span="12">
                <a>{{ playerName }}: </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.pointList[index]" class="dialog-input" clearable slot="content" placeholder="输入点数" placeholder-class="placeholder"/>
            </t-col>
        </t-row>
    </t-dialog>

    <t-dialog v-model:visible="revokeState.on" close-on-overlay-click content="撤销后无法回退，且仅能撤销一次，确认撤销吗？" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onRevokeConfirm" @cancel="onRevokeCancel" @close="onRevokeClose">
    </t-dialog>

    <t-dialog v-model:visible="leave.showAlert" close-on-overlay-click content="现在退出不保存任何数据,确定吗?" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onConfirm" @cancel="onCancel" @close="onClose">
    </t-dialog>

</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { onBeforeRouteLeave, type RouteLocationNormalized } from 'vue-router';
import { PlayIcon } from 'tdesign-icons-vue-next';
import type { PickerValue } from 'tdesign-mobile-vue/es/picker/type';
import { useGameStore } from '@/stores/storage';

const gameStore = useGameStore()

// 局内逻辑
const kyokuList = ['东一局', '东二局', '东三局', '东四局', '南一局', '南二局', '南三局', '南四局', '西一局', '西二局', '西三局', '西四局']
const kazeList = ['东', '南', '西', '北']
const fanList = ['一番', '两番', '三番', '四番', '满贯', '跳满', '倍满', '三倍满', '役满', '两倍役满', '三倍役满', '四倍役满', '五倍役满', '六倍役满']
const fuList = ['20符', '25符', '30符', '40符', '50符', '60符', '70符', '80符', '90符', '100符', '110符']
const kyokuListOptions = ref<{ label: string, value: string }[][]>([]);
const fanfuList = ref<{ label: string, value: string }[][]>([]);
const currentKyoku = ref<number>(0)
const honba = ref<number>(0)
const kyoutaku = ref<number>(0)

// 和了，流局
interface WinState {
    fanfu: Array<string>,
    winners: Array<string>,
    loser: string,
    ron: boolean,
    tsumo: boolean,
    ryuukyoku: boolean
}

const winState: WinState = reactive({
    fanfu: [],
    winners: [],
    loser: '',
    ron: false,
    tsumo: false,
    ryuukyoku: false
})

// 编辑

interface EditState {
    on: boolean,
    currentKyoku: Array<string>,
    honba: number,
    kyoutaku: number,
    pointList: Array<number>
}

const editState: EditState = reactive({
    on: false,
    currentKyoku: [],
    honba: 0,
    kyoutaku: 0,
    pointList: Array(4).fill(gameStore.startPoint)
})

// 撤销
interface RevokeState {
    on: boolean,
    currentKyoku: number,
    honba: number,
    kyoutaku: number,
    pointList: Array<number>
}

const revokeState: RevokeState = reactive({
    on: false,
    currentKyoku: 0,
    honba: 0,
    kyoutaku: 0,
    pointList: Array(4).fill(gameStore.startPoint)
})

// 和了放铳对象选项框
const winners = ref<Array<string>>([]);
const winner  =ref<number>(0)
const loser = ref<number>(0)
const options = ref<{ label: string, value: string }[]>([])

onMounted(() => {
    // 番符选择器初始化
    var result: { label: string, value: string }[][] = [[], []]
    for (const fan of fanList as string[]) {
        result[0].push({
            label: fan,
            value: fan
        });
    }

    for (const fu of fuList as string[]) {
        result[1].push({
            label: fu,
            value: fu
        });
    }

    fanfuList.value = result

    // 选局列表初始化
    var resultKyoku: { label: string, value: string }[][] = [[]]
    for (const kyoku of kyokuList as string[]) {
        resultKyoku[0].push({
            label: kyoku,
            value: kyoku
        });
    }

    kyokuListOptions.value = resultKyoku

    // 和了放铳对象选项框初始化
    // 风向初始化
    var resultPlayer: { label: string, value: string }[] = []
    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat) % 4]
        gameStore.setPlayer(player.name, player)

        resultPlayer.push({
            label: player.name,
            value: player.name
        })
    }
    options.value = resultPlayer
})

function goNextKyoku() {
    if (checkGameOver()) {
        goGameOver()
        return
    }

    currentKyoku.value++
    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
        gameStore.setPlayer(player.name, player)
    }
}

function setHonba() {

}

function setKyoutaku() {

}

function checkGameOver(): boolean {
    if (currentKyoku.value >= kyokuList.length - 1) {
        return true
    }
    return false
}

function goGameOver() {

}

// 自摸
const onTsumo = () => {
    winState.tsumo = true
}

const onTsumRadioGroupChange = () => {

}

const onTsumoChange = () => {
    winState.tsumo = false
}

const onTsumoCancel = () => {
    winState.tsumo = false
}

// 荣和
const onRon = () => {
    winState.ron = true
}

const onRonCheckboxGroupChange = () => {

}

const onRonRadioGroupChange = () => {

}

const onRonChange = () => {
    winState.ron = false
}

const onRonCancel = () => {
    winState.ron = false
}

// 流局
const onRyuukyoku = () => {
    winState.ryuukyoku = true
}

const onRyuukyokuCheckboxGroupChange = () => {

}

const onRyuukyokuConfirm = () => {
    winState.ryuukyoku = false
}

const onRyuukyokuCancel = () => {
    winState.ryuukyoku = false
}

// 编辑
const onEdit = () => {
    editState.on = true
}

const onEditChange = () => {
    editState.on = false
}

const onEditCancel = () => {
    editState.on = false
}

// 撤销
const onRevoke = () => {
    revokeState.on = true
}

const onRevokeConfirm = () => {
    revokeState.on = false
}

const onRevokeCancel = () => {
    revokeState.on = false
}

const onRevokeClose = () => {
    revokeState.on = false
}

// 界面逻辑
const leave = ref({
    showAlert: false,
    to: {} as RouteLocationNormalized,
    next: {} as Function
})

onBeforeRouteLeave((to, from, next) => {
    leave.value.showAlert = true
    leave.value.to = to
    leave.value.next = next
});


const onConfirm = () => {
    leave.value.next()
};

const onCancel = () => {
    leave.value.next(false)
};

const onClose = () => {
    console.log('dialog: close');
};

const eventHandler = (event: Event) => {
    event.preventDefault();
};

onMounted(() => {
    window.addEventListener('beforeunload', eventHandler);
    window.addEventListener('popstate', eventHandler);
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', eventHandler);
    window.removeEventListener('popstate', eventHandler);
});

</script>

<style scoped lang="less">
.actionButton {
    width: 10vmin;
    height: 7vmin;
    margin-left: 4vmin;
    margin-right: 4vmin;
}


.richi {
    width: 20vmin;
    height: 10vmin;
    margin: auto;
    right: 0;
    left: 0;
}

.title {
    font-size: 8vmin;
    line-height: 0.5vmin;
    text-align: center;
}

.text {
    font-size: 4vmin;
    line-height: 0.8vmin;
    text-align: center;
}
</style>