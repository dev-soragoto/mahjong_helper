<template>
    <div style="height: 90dvh; width: 100dvw; position: absolute; margin: auto; 
        top: 0; left: 0; right: 0; background-color: #fcbad3;">

        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: blanchedalmond; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 35dvmin; height: 35dvmin;">
            <p class="title"><strong>{{ kyokuList[currentKyoku] }}</strong></p>
            <p class="text"><strong>{{ honba }}本场</strong></p>
            <p class="text"><strong>{{ kyoutaku * 1000 }}供托</strong></p>
        </div>

        <div style="position: absolute; margin: auto; left: 0; right: 0; bottom: 2dvmin;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin;">
            <t-button class="riichi" style="margin-bottom: -2dvmin" :theme="gameStore.getSeat(0).riichi ? 'primary' : 'light'" @click="onRiichi(0)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(0).seat }} {{ gameStore.getSeat(0).point }}</strong></p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(0).name }}</strong></p>
        </div>

        <div style="position: absolute; margin: auto; top: 2dvmin; left: 0; right: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin; transform: rotate(180deg);">
            <t-button class="riichi" style="margin-bottom: -2dvmin" :theme="gameStore.getSeat(2).riichi ? 'primary' : 'light'" @click="onRiichi(2)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(2).seat }} {{ gameStore.getSeat(2).point }}</strong></p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(2).name }}</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  right: -5.5dvmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin; transform: rotate(270deg);">
            <t-button class="riichi" style="margin-bottom: -2dvmin" :theme="gameStore.getSeat(1).riichi ? 'primary' : 'light'" @click="onRiichi(1)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(1).seat }} {{ gameStore.getSeat(1).point }}</strong></p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(1).name }}</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  left: -5.5dvmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin; transform: rotate(90deg);">
            <t-button class="riichi" style="margin-bottom: -2dvmin" :theme="gameStore.getSeat(3).riichi ? 'primary' : 'light'" @click="onRiichi(3)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(3).seat }} {{ gameStore.getSeat(3).point }}</strong></p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(3).name }}</strong></p>
        </div>

    </div>

    <div style="height: 10dvh; width: 100dvw; position: absolute; margin: auto; 
        bottom: 0; left: 0; right: 0; background-color: #aa96da;">
        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: transparent; display: flex; justify-content: space-between; align-items: center;">
            <t-button class="actionButton" theme="light" @click="onTsumo">自摸</t-button>
            <t-button class="actionButton" theme="light" @click="onRon">荣和</t-button>
            <t-button class="actionButton" theme="light" @click="onRyuukyoku">流局</t-button>
            <t-button class="actionButton" theme="light" @click="onEdit">编辑</t-button>
            <t-button class="actionButton" theme="light" @click="onRevoke">撤销</t-button>
        </div>

    </div>

    <t-dialog v-model:visible="winState.tsumo">
        <t-picker v-model="winState.fanfu" :columns="fanfuList" @change="onTsumoChange" @cancel="onTsumoCancel" />
        <t-cell title="选择自摸玩家" borderless></t-cell>
        <t-radio-group v-model:value="winState.winner" @change="onTsumoRadioGroupChange">
            <t-radio v-for="playerName of gameStore.seatList" name="winner" :value="playerName" :label="playerName" />
        </t-radio-group>
    </t-dialog>

    <t-dialog v-model:visible="winState.ron" confirm-btn="确定" cancel-btn="取消" @confirm="onRonConfirm">
        <t-cell title="选择荣和玩家" borderless></t-cell>
        <t-checkbox-group v-model:value="winState.winners" @change="onRonCheckboxGroupChange">
            <t-checkbox :value="gameStore.getSeat(0).name" :label="gameStore.getSeat(0).name" />
            <t-dropdown-menu showOverlay>
                <t-dropdown-item :options="fanfuList[0]" v-model:value="winState.fanfuRon[0].fan" @onChange="(value: string) => onFanRonChange(value, 0)" />
                <t-dropdown-item :options="fanfuList[1]" v-model:value="winState.fanfuRon[0].fu" @onChange="(value: string) => onFuRonChange(value, 0)" />
            </t-dropdown-menu>
            <t-checkbox :value="gameStore.getSeat(1).name" :label="gameStore.getSeat(1).name" />
            <t-dropdown-menu showOverlay>
                <t-dropdown-item :options="fanfuList[0]" v-model:value="winState.fanfuRon[1].fan" @onChange="(value: string) => onFanRonChange(value, 1)" />
                <t-dropdown-item :options="fanfuList[1]" v-model:value="winState.fanfuRon[1].fu" @onChange="(value: string) => onFuRonChange(value, 1)" />
            </t-dropdown-menu>
            <t-checkbox :value="gameStore.getSeat(2).name" :label="gameStore.getSeat(2).name" />
            <t-dropdown-menu showOverlay>
                <t-dropdown-item :options="fanfuList[0]" v-model:value="winState.fanfuRon[2].fan" @onChange="(value: string) => onFanRonChange(value, 2)" />
                <t-dropdown-item :options="fanfuList[1]" v-model:value="winState.fanfuRon[2].fu" @onChange="(value: string) => onFuRonChange(value, 2)" />
            </t-dropdown-menu>
            <t-checkbox :value="gameStore.getSeat(3).name" :label="gameStore.getSeat(3).name" />
            <t-dropdown-menu showOverlay>
                <t-dropdown-item :options="fanfuList[0]" v-model:value="winState.fanfuRon[3].fan" @onChange="(value: string) => onFanRonChange(value, 3)" />
                <t-dropdown-item :options="fanfuList[1]" v-model:value="winState.fanfuRon[3].fu" @onChange="(value: string) => onFuRonChange(value, 3)" />
            </t-dropdown-menu>
        </t-checkbox-group>
        <t-cell title="选择放铳玩家" borderless></t-cell>
        <t-radio-group v-model:value="winState.loser" @change="onRonRadioGroupChange">
            <t-radio v-for="playerName of gameStore.seatList" name="lose" :value="playerName" :label="playerName" />
        </t-radio-group>
    </t-dialog>

    <t-dialog v-model:visible="winState.ryuukyoku" confirm-btn="确定" cancel-btn="取消" @confirm="onRyuukyokuConfirm" @cancel="onRyuukyokuCancel">
        <t-cell title="选择听牌玩家" borderless></t-cell>
        <t-checkbox-group v-model:value="winState.winners" :options="options" @change="onRyuukyokuCheckboxGroupChange" />
    </t-dialog>

    <t-dialog v-model:visible="editState.on">
        <t-picker v-model="editState.currentKyoku" :columns="kyokuListOptions" @change="onEditChange" @cancel="onEditCancel" />
        <t-row>
            <t-col span="12">
                <a>本场: </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.honba" type="number" class="dialog-input" clearable slot="content" placeholder="输入本场" placeholder-class="placeholder"/>
            </t-col>
        </t-row>
        <t-row>
            <t-col span="12">
                <a>供托(x1000): </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.kyoutaku" type="number" class="dialog-input" clearable slot="content" placeholder="输入供托数" placeholder-class="placeholder"/>
            </t-col>
        </t-row>
        <t-row v-for="(playerName, index) of gameStore.seatList" :key="index">
            <t-col span="12">
                <a>{{ playerName }}: </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.pointList[index]" type="number" class="dialog-input" clearable slot="content" placeholder="输入点数" placeholder-class="placeholder"/>
            </t-col>
        </t-row>
    </t-dialog>

    <t-dialog v-model:visible="revokeState.on" close-on-overlay-click content="撤销后无法回退，且仅能撤销一次，确认撤销吗？" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onRevokeConfirm" @cancel="onRevokeCancel" @close="onRevokeClose">
    </t-dialog>

    <t-dialog v-model:visible="finalState.on" title="终局结果" confirm-btn="确定" @confirm="onFinalConfirm">
        <p v-for="(playerName, index) of finalState.result" :key="index" class="text" style="margin-bottom: 2dvmin"><strong>{{ playerName }} : {{ gameStore.getPlayer(playerName).point }}</strong></p>
    </t-dialog>

    <t-dialog v-model:visible="leave.showAlert" close-on-overlay-click content="现在退出不保存任何数据,确定吗?" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onConfirm" @cancel="onCancel" @close="onClose">
    </t-dialog>

</template>

<script lang="ts" setup>
import router from '@/router';
import { useGameStore, saveHistory } from '@/stores/storage';
import type { HistoryData } from '@/stores/storage';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { onBeforeRouteLeave, type RouteLocationNormalized } from 'vue-router';
import { Toast } from 'tdesign-mobile-vue';
import type { Player } from '@/ts/common';

const gameStore = useGameStore()

// 局内逻辑
const kyokuList = ['东一局', '东二局', '东三局', '东四局', '南一局', '南二局', '南三局', '南四局', '西一局', '西二局', '西三局', '西四局']
const kazeList = ['东', '南', '西', '北']
const fanList = ['一番', '两番', '三番', '四番', '满贯', '跳满', '倍满', '三倍满', '役满', '两倍役满', '三倍役满', '四倍役满', '五倍役满', '六倍役满']
const fuListStr = ['20符', '25符', '30符', '40符', '50符', '60符', '70符', '80符', '90符', '100符', '110符']
const fuList = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]
const kyokuListOptions = ref<{ label: string, value: string }[][]>([]);
const fanfuList = ref<{ label: string, value: string }[][]>([]);
const currentKyoku = ref<number>(0)
const honba = ref<number>(0)
const kyoutaku = ref<number>(0)
let endingFlag = false
const ronWinnerFlag = reactive([false, false, false, false])

// 和了，流局
interface WinState {
    fanfu: string [],
    fanfuRon: { fan: string, fu: string } [],
    winners: string [],
    winner: string,
    loser: string,
    ron: boolean,
    ronCheck: boolean,
    tsumo: boolean,
    tsumoCheck: boolean,
    ryuukyoku: boolean,
    ryuukyokuCheck: boolean,
    oyaWinFlag: boolean
}

const winState: WinState = reactive({
    fanfu: [],
    fanfuRon: [],
    winners: [],
    winner: '',
    loser: '',
    ron: false,
    ronCheck: false,
    tsumo: false,
    tsumoCheck: false,
    ryuukyoku: false,
    ryuukyokuCheck: false,
    oyaWinFlag: false
})

resetwinState()

// 编辑
interface EditState {
    on: boolean,
    currentKyoku: Array<string>,
    honba: String,
    kyoutaku: String,
    pointList: Array<String>
}

const editState: EditState = reactive({
    on: false,
    currentKyoku: [],
    honba: '0',
    kyoutaku: '0',
    pointList: Array(4).fill((String)(gameStore.startPoint))
})

// 撤销
interface RevokeState {
    on: boolean,
    currentKyoku: number,
    honba: string,
    kyoutaku: string,
    pointList: Array<string>
}

const revokeState: RevokeState = reactive({
    on: false,
    currentKyoku: 0,
    honba: '0',
    kyoutaku: '0',
    pointList: Array(4).fill((String)(gameStore.startPoint))
})

// 终局结果
interface FinalState {
    on: boolean,
    result: Array<string>
}

const finalState: FinalState = reactive({
    on: false,
    result: []
})

// 和了放铳对象选项框
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

    for (const fu of fuListStr as string[]) {
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

    setEditState()
    setRevokeState()
    resetwinState()
})

function resetwinState() {
    winState.fanfu = []
    winState.fanfuRon = []
    for (let i = 0; i < gameStore.count; i++) {
        winState.fanfuRon.push({ fan:'一番', fu:'30符'})
    }
    winState.winners = []
    winState.winner = ''
    winState.loser = ''
    winState.ron = false
    winState.ronCheck = false
    winState.tsumo = false
    winState.tsumoCheck = false
    winState.ryuukyoku = false
    winState.ryuukyokuCheck = false
    winState.oyaWinFlag = false
    
}

function setEditState() {
    editState.currentKyoku = [kyokuList[currentKyoku.value]]
    editState.honba = (String)(honba.value)
    editState.kyoutaku = (String)(kyoutaku.value)
    editState.pointList = []
    for (var i = 0; i < gameStore.count; i++) {
        editState.pointList.push((String)(gameStore.getSeat(i).point))
    }
}

function setRevokeState() {
    revokeState.currentKyoku = currentKyoku.value
    revokeState.honba = (String)(honba.value)
    revokeState.kyoutaku = (String)(kyoutaku.value)
    revokeState.pointList = []
    for (var i = 0; i < gameStore.count; i++) {
        revokeState.pointList.push((String)(gameStore.getSeat(i).point))
    }
}

function goNextKyoku() {
    var riichibous = 0
    for (var i = 0; i < gameStore.count; i++) {
        if (gameStore.playerList[i].riichi) {
            riichibous++
            gameStore.playerList[i].riichi = false
        }
    }
    if (winState.oyaWinFlag) {
        honba.value++
        if (winState.ryuukyokuCheck) {
            kyoutaku.value += riichibous
        }
        else {
            kyoutaku.value = 0
        }
    }
    else {
        if (winState.ryuukyokuCheck) {
            honba.value++
            kyoutaku.value += riichibous
        }
        else {
            honba.value = 0
            kyoutaku.value = 0
        }

        currentKyoku.value++
        for (var i = 0; i < 4; i++) {
            var player = gameStore.getSeat(i)
            player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
            gameStore.setPlayer(player.name, player)
        }
    }

    resetwinState()
    return
}

function checkGameOver(): boolean {
    // 击飞，结束游戏
    if (gameStore.bankruptcy) {
        for (const player of gameStore.playerList) {
            if (player.point < 0) {
                return true
            }
        }
    }

    var allLast = 7
    // 东风战
    if (gameStore.gameType === 'eastWind') {
        allLast = 3
    }

    // all last
    if (currentKyoku.value >= allLast ) {
        // 检查亲家和了和流局听牌状态
        var oyaPlayer: Player = {
            name: '',
            seat: '',
            point: 0,
            riichi: false
        }
        for (var winPlayer of winState.winners as string[]) {
            if (gameStore.getPlayer(winPlayer).seat === '东') {
                oyaPlayer = gameStore.getPlayer(winPlayer)
                break
            }            
        }

        if (gameStore.getPlayer(winState.winner).seat === '东') {
            oyaPlayer = gameStore.getPlayer(winState.winner)
        }

        // 寻找当前top
        var result: Map<string, number> = gameStore.getResultMap()
        var topPlayerNames = []
        var topPoint = 0
        for (const [name, point] of result) {
            if (point > topPoint) {
                topPlayerNames = []
                topPlayerNames.push(name)
                topPoint = point
                continue
            }
            if (point == topPoint) {
                topPlayerNames.push(name)
            }
        }

        var topPlayerSeat = gameStore.startSeat - 1
        for (const playerName of topPlayerNames as string[]) {
            var playerSeat = gameStore.seatList.indexOf(playerName)
            if ((playerSeat + 4 - gameStore.startSeat) % 4 < (topPlayerSeat + 4 - gameStore.startSeat) % 4) {
                topPlayerSeat = playerSeat
            }            
        }
        var topPlayer = gameStore.getSeat(topPlayerSeat)
        if (winState.oyaWinFlag) {
            // 亲家和了或流局听牌
            // 亲家是top，结束游戏
            if (topPlayer.name === oyaPlayer.name) {
                if (topPoint >=  gameStore.returnPoint) {
                    return true   
                }
                else {
                    if (gameStore.continuingIntoWest) {
                    // 西四局，强制终局
                        if (currentKyoku.value >= kyokuList.length - 1) {
                            return true
                        }
                    }
                    else {
                        // 南四局，强制终局
                        if (currentKyoku.value >= 7) {
                            return true
                        }
                    }
                }
            }
        }
        else {
            //亲家未和了且流局未听牌
            // top低于返点，继续游戏（在强制终局前）
            if (topPoint < gameStore.returnPoint) {
                if (gameStore.continuingIntoWest) {
                    // 西四局，强制终局
                    if (currentKyoku.value >= kyokuList.length - 1) {
                        return true
                    }
                }
                else {
                    // 南四局，强制终局
                    if (currentKyoku.value >= 7) {
                        return true
                    }
                }
            }
            else {
                return true
            }
        }
    }
    

    return false
}

function goGameOver() {
    var resultPoint: number[] = []
    for (var i = 0; i < gameStore.count; i++) {
        resultPoint.push(gameStore.getSeat(i).point)
    }

    var result: string[] = gameStore.seatList.slice(0)
    var resultSeat: number[] = [0, 1, 2, 3]
    resultSeat = resultSeat.map(seat => (seat + 4 - gameStore.startSeat) % 4)
    for (var i = 0; i < gameStore.count; i++) {
        for (var j = 0; j < gameStore.count - 1 - i; j++) {
            if (resultPoint[j] < resultPoint[j + 1]) {
                var temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
                let temp2 = resultPoint[j]
                resultPoint[j] = resultPoint[j + 1]
                resultPoint[j + 1] = temp2
                let temp3 = resultSeat[j]
                resultSeat[j] = resultSeat[j + 1]
                resultSeat[j + 1] = temp3
            }
            if (resultPoint[j] == resultPoint[j + 1]) {
                if (resultSeat[j] > resultSeat[j + 1]) {
                    var temp = result[j]
                    result[j] = result[j + 1]
                    result[j + 1] = temp
                    let temp2 = resultPoint[j]
                    resultPoint[j] = resultPoint[j + 1]
                    resultPoint[j + 1] = temp2
                    let temp3 = resultSeat[j]
                    resultSeat[j] = resultSeat[j + 1]
                    resultSeat[j + 1] = temp3
                }
            }
        }
    }

    finalState.result = result

    let riichibous = 0

    for (const playerName of finalState.result) {
        let player = gameStore.getPlayer(playerName)
        if (player.riichi) {
            player.riichi = false
            riichibous ++
        }
        gameStore.setPlayer(player.name, player)
    }

    let finaleWinner = gameStore.getPlayer(finalState.result[0])
    finaleWinner.point += riichibous * 1000 + kyoutaku.value * 1000
    gameStore.setPlayer(finaleWinner.name, finaleWinner)

    honba.value = 0
    kyoutaku.value = 0

    finalState.on = true
}

function calculateA(fan:number, fu:number): number {
    var a = fu * (2 ** (fan + 2))
    if (a > 2000) {
        a = 2000
    }
    if (fan == 6) {
        a = 3000
    }
    if (fan == 7) {
        a = 4000
    }
    if (fan == 8) {
        a = 6000
    }
    if (fan > 8) {
        a = 8000 * (fan - 8)
    }

    return a
}

// 保存终局结果，返回setup页面
const onFinalConfirm = () => {
    let result: HistoryData = {
        timeStamp: Date.now(),
        record: new Array<string []>()
    }
    for (let i = 0; i < gameStore.count; i++) {
        result.record.push([finalState.result[i], (String)(gameStore.getPlayer(finalState.result[i]).point)])
    }
    saveHistory(result)
    gameStore.resetPlayer()
    finalState.on = false
    endingFlag = true
    router.push('/setup');
}

const onRiichi = (seat: number) => {
    let player = gameStore.getSeat(seat)
    if (!gameStore.negativeRiichi && player.point < 1000) {
        return
    }
    player.riichi = !player.riichi
    gameStore.setPlayer(player.name, player)
}

// 自摸
const onTsumo = () => {
    winState.tsumo = true
}

const onTsumoRadioGroupChange = () => {

}

const onTsumoChange = () => {
    if (winState.winner === '') {
        Toast.error('未选择自摸玩家！')
        return
    }

    setRevokeState()

    var winPlayer = gameStore.getPlayer(winState.winner)
    var winFan = fanList.indexOf(winState.fanfu[0]) + 1
    var winFu = fuList[fuListStr.indexOf(winState.fanfu[1])]
    var a = calculateA(winFan, winFu)

    var riichibous = 0
    if (winPlayer.seat === '东') {
        winState.oyaWinFlag = true
        var payPoint: number [] = [Math.ceil(2 * a / 100) * 100 + honba.value * 100]
        for (var i = 0; i < gameStore.count; i++) {
            if (gameStore.playerList[i].name === winPlayer.name) {
                continue
            }
            gameStore.playerList[i].point -= payPoint[0]
            if (gameStore.playerList[i].riichi) {
                riichibous++
                gameStore.playerList[i].point -= 1000
            }
        }
        winPlayer.point += 3 * payPoint[0] + kyoutaku.value * 1000 + riichibous * 1000
        winPlayer.riichi = false
        gameStore.setPlayer(winPlayer.name, winPlayer)
    }
    else {
        var payPoint: number [] = [Math.ceil(a / 100) * 100 + honba.value * 100, Math.ceil(2 * a / 100) * 100 + honba.value * 100]
        for (var i = 0; i < gameStore.count; i++) {
            if (gameStore.playerList[i].name === winPlayer.name) {
                continue
            }
            if (gameStore.playerList[i].seat === '东') {
                gameStore.playerList[i].point -= payPoint[1]
            }
            else {
                gameStore.playerList[i].point -= payPoint[0]
            }
            if (gameStore.playerList[i].riichi) {
                riichibous++
                gameStore.playerList[i].point -= 1000
            }
        }

        winPlayer.point += 2 * payPoint[0] + payPoint[1] + kyoutaku.value * 1000 + riichibous * 1000
        gameStore.setPlayer(winPlayer.name, winPlayer)
    }

    winState.tsumoCheck = true
    if (checkGameOver()) {
        goGameOver()
    }

    goNextKyoku()
    setEditState()
    winState.tsumo = false
}

const onTsumoCancel = () => {
    winState.tsumo = false
}

// 荣和
const onRon = () => {
    winState.ron = true
}

const onRonCheckboxGroupChange = (value: any, context: { e: Event, current: string, type: string }) => {
    let seat = gameStore.seatList.indexOf(context.current)
    if (context.type === 'check') {
        ronWinnerFlag[seat] = true
    }
    else {
        ronWinnerFlag[seat] = false
    }
}

const onRonRadioGroupChange = () => {

}

const onFanRonChange = (value: string, index: number) => {
    winState.fanfuRon[index].fan = value
}

const onFuRonChange = (value: string, index: number) => {
    winState.fanfuRon[index].fu = value
}

const onRonConfirm = () => {
    if (winState.winners.length < 1) {
        Toast.error('未选择和了玩家！')
        return
    }
    if (winState.loser === '') {
        Toast.error('未选择放铳玩家！')
        return
    }

    setRevokeState()

    var winPlayers: Array<Player> = []
    var winSeats: number[] = []
    for (const winPlayerName of winState.winners as string[]) {
       winSeats.push(gameStore.seatList.indexOf(winPlayerName))
    }
    
    var losePlayer: Player = gameStore.getPlayer(winState.loser)
    var loseSeat = gameStore.seatList.indexOf(winState.loser)
    winSeats = winSeats.sort((a, b) => ((a - loseSeat + 4) % 4) - ((b - loseSeat + 4) % 4))
    
    for (const winSeat of winSeats as number[]) {
       winPlayers.push(gameStore.getSeat(winSeat))
    }
    

    for (let i = 0; i < winPlayers.length; i++) {
        var seat = winSeats[i]
        var winFan = fanList.indexOf(winState.fanfuRon[seat].fan) + 1
        var winFu = fuList[fuListStr.indexOf(winState.fanfuRon[seat].fu)]
        var a = calculateA(winFan, winFu)
        if (winPlayers[i].seat === '东') {
            winState.oyaWinFlag = true
            var payPoint: number = Math.ceil(6 * a / 100) * 100
            winPlayers[i].point += payPoint
            winPlayers[i].riichi = false
            losePlayer.point -= payPoint
        }
        else {
            var payPoint: number = Math.ceil(4 * a / 100) * 100
            winPlayers[i].point += payPoint
            winPlayers[i].riichi = false
            losePlayer.point -= payPoint
        }
        if (i == 0) {
            for (var j = 0; j < gameStore.count; j++) {
                if (gameStore.playerList[j].name === winPlayers[i].name) {
                    continue
                }
                if (gameStore.playerList[j].riichi) {
                    gameStore.playerList[j].riichi = false
                    gameStore.playerList[j].point -= 1000
                    winPlayers[i].point += 1000
                }
            }

            winPlayers[i].point += honba.value * 300 + kyoutaku.value * 1000
        }

        gameStore.setPlayer(winPlayers[i].name, winPlayers[i])
    }
    gameStore.setPlayer(losePlayer.name, losePlayer)

    winState.ronCheck = true
    if (checkGameOver()) {
        goGameOver()
    }

    goNextKyoku()
    setEditState()
    resetwinState()
    winState.ron = false
}

const onRonCancel = () => {
    winState.ron = false
}

// 流局
const onRyuukyoku = () => {
    for (let i = 0; i < gameStore.count; i++) {
        let player = gameStore.getSeat(i)
        if (player.riichi) {
            winState.winners.push(player.name)
        }
    }
    winState.ryuukyoku = true
}

const onRyuukyokuCheckboxGroupChange = () => {
    
}

const onRyuukyokuConfirm = () => {
    setRevokeState()

    var winPlayers: Array<object> = []
    for (const winPlayerName of winState.winners as string[]) {
        var winPlayer = gameStore.getPlayer(winPlayerName)
        winPlayers.push(winPlayer)
        if (winPlayer.riichi) {
            winPlayer.point -= 1000
            gameStore.setPlayer(winPlayer.name, winPlayer)
        }
        if (winPlayer.seat === '东') {
            winState.oyaWinFlag = true
        }
    }

    if (winState.winners.length == 3) {
        for (var i = 0; i < gameStore.count; i++) {
            if (winState.winners.indexOf(gameStore.playerList[i].name) < 0) {
                gameStore.playerList[i].point -= 3000
                continue
            }
            gameStore.playerList[i].point += 1000
        }
    }
    if (winState.winners.length == 2) {
        for (var i = 0; i < gameStore.count; i++) {
            if (winState.winners.indexOf(gameStore.playerList[i].name) < 0) {
                gameStore.playerList[i].point -= 1500
                continue
            }
            gameStore.playerList[i].point += 1500
        }
    }
    if (winState.winners.length == 1) {
        for (var i = 0; i < gameStore.count; i++) {
            if (winState.winners.indexOf(gameStore.playerList[i].name) < 0) {
                gameStore.playerList[i].point -= 1000
                continue
            }
            gameStore.playerList[i].point += 3000
        }
    }

    winState.ryuukyokuCheck = true
    if (checkGameOver()) {
        goGameOver()
    }

    goNextKyoku()
    setEditState()
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
    setRevokeState()

    let checkSum = 0
    for (const point of editState.pointList as string []) {
        checkSum += Number(point)
    }
    checkSum += Number(editState.kyoutaku) * 1000
    if (checkSum != gameStore.startPoint * gameStore.count) {
        Toast.error('总分校验不通过！')
        return
    }

    currentKyoku.value = kyokuList.indexOf(editState.currentKyoku.join(''))
    honba.value = Number(editState.honba)
    kyoutaku.value = Number(editState.kyoutaku)
    for (var i = 0; i < gameStore.count; i++) {
        var player = gameStore.getSeat(i)
        player.point = Number(editState.pointList[i])
        player.riichi = false
        gameStore.setPlayer(player.name, player)
    }

    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
        gameStore.setPlayer(player.name, player)
    }

    resetwinState()

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
    currentKyoku.value = revokeState.currentKyoku
    honba.value = Number(revokeState.honba)
    kyoutaku.value = Number(revokeState.kyoutaku)
    for (var i = 0; i < gameStore.count; i++) {
        var player = gameStore.getSeat(i)
        player.point = Number(revokeState.pointList[i])
        player.riichi = false
        gameStore.setPlayer(player.name, player)
    }

    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
        gameStore.setPlayer(player.name, player)
    }

    resetwinState()

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
    leave.value.to = to
    leave.value.next = next
    if (!endingFlag) {
        leave.value.showAlert = true
        return
    }
    leave.value.next()
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
    width: 10dvmin;
    height: 7dvmin;
    margin-left: 4dvmin;
    margin-right: 4dvmin;
}


.riichi {
    width: 20dvmin;
    height: 10dvmin;
    margin: auto;
    right: 0;
    left: 0;
}

.title {
    font-size: 8dvmin;
    line-height: 0.5dvmin;
    text-align: center;
}

.text {
    font-size: 4dvmin;
    line-height: 0.8dvmin;
    text-align: center;
}
</style>