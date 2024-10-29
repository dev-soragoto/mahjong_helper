import type { Player, PlayerRef } from '@/ts/common';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const historyStore = 'history';
export const configStore = 'config'

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            count: 0,
            playerPool: reactive<Array<Player>>(new Array<Player>()),
            playerList: reactive<Array<Player>>(new Array<Player>()),
            playerListMap: new Map<string, number>(),
            seatList: ref<Array<string>>(new Array<string>()),
            continuingIntoWest: true,
            bankruptcy: true,
            negativeRiichi: false,
            startPoint: 25000,
            returnPoint: 30000,
            playerListRef: reactive<Array<PlayerRef>>(new Array<PlayerRef>()),
            gameType: 'halfGame',
            startSeat: ref<number>(0)
        }
    },

    actions: {
        setPlayer(name: string, player: Player): boolean {
            if (this.playerListMap.has(name)) {
                var index = this.playerListMap.get(name);
                if (index == undefined) {
                    console.log(name + '的映射不存在！');
                    return false;
                }
                this.playerListMap.delete(name);
                this.playerListMap.set(player.name, index);
                this.playerList[index].name = player.name;
                this.playerList[index].seat = player.seat;
                this.playerList[index].point = player.point;
                this.playerList[index].riichi = player.riichi;
                for (var i = 0; i < this.seatList.length; i++) {
                    if (this.seatList[i] === name) {
                        this.seatList[i] = player.name;
                    }
                }
            }
            else {
                this.playerListRef.push(
                    {
                        visible: false,
                        inputModel: '',
                        key: 0
                    }
                );
                this.playerList.push(player);
                this.count = this.playerList.length;
                this.playerListMap.set(player.name, this.count - 1);
            }
            return true
        },
        deletePlayer(name: string): boolean {
            if (this.playerListMap.has(name)) {
                var n = this.playerListMap.get(name);
                if (n == undefined) {
                    console.log(name + '的映射不存在！');
                    return false
                }
                this.playerListMap = new Map<string, number>();
                this.playerListRef.splice(n, 1);
                this.playerList.splice(n, 1);
                for (let index = 0; index < this.playerList.length; index++) {
                    this.playerListMap.set(this.playerList[index].name, index);
                }
                this.count = this.playerList.length;
                let seat = this.seatList.indexOf(name)
                this.seatList[seat] = ''
            }

            return true
        },
        resetPlayer(): void {
            for (let i = 0; i < this.count; i++) {
                this.playerList[i].point = this.startPoint
            }
        },
        getPlayer(name: string): Player {
            let index = this.playerListMap.get(name);
            if (index == undefined) {
                console.log(name + '的映射不存在！');
                return {
                    name: '',
                    seat: '',
                    point: -1,
                    riichi: false
                };
            }
            return this.playerList[index];
        },
        getPlayerRef(name: string): PlayerRef {
            let index = this.playerListMap.get(name);
            if (index == undefined) {
                console.log(name + '的映射不存在！');
                return {
                    visible: false,
                    inputModel: '',
                    key: -1
                };
            }
            return this.playerListRef[index];
        },
        setPlayerRef(name: string, visible: boolean): boolean {
            let index = this.playerListMap.get(name);
            if (index == undefined) {
                console.log(name + '的映射不存在！');
                return false;
            }
            this.playerListRef[index].visible = visible;

            return true
        },
        getResult(): HistoryData {
            var result: HistoryData = {
                timeStamp: Date.now(),
                record: new Array<string[]>()
            }
            for (const player of this.playerList) {
                result.record.push([player.name, (String)(player.point)])
            }

            return result;
        },
        getResultMap(): Map<string, number> {
            let result = new Map<string, number>()
            for (const player of this.playerList) {
                result.set(player.name, player.point)
            }

            return result
        },
        getSeat(index: number): Player {
            let n = this.playerListMap.get(this.seatList[index]);
            if (n == undefined) {
                return {
                    name: '',
                    seat: '',
                    point: -1,
                    riichi: false
                };;
            }
            return this.playerList[n];
        },
        setConfig(continuingIntoWest: boolean, bankruptcy: boolean, negativeRiichi: boolean, startPoint: number, returnPoint: number) {
            this.continuingIntoWest = continuingIntoWest;
            this.bankruptcy = bankruptcy;
            this.negativeRiichi = negativeRiichi;
            this.startPoint = Number(startPoint);
            this.returnPoint = Number(returnPoint);
            for (var i = 0; i < this.count; i++) {
                this.playerList[i].point = this.startPoint
            }
        }
    }
});

export interface GameConfig {
    count: number,
    playerList: Array<Player>,
    playerListMap: { [s: string]: number },
    seatList: Array<string>,
    continuingIntoWest: boolean,
    bankruptcy: boolean,
    negativeRiichi: boolean,
    startPoint: number,
    returnPoint: number,
    playerListRef: Array<PlayerRef>,
    gameType: string,
    startSeat: number
}
export interface HistoryData {
    timeStamp: number,
    record: string[][]
}


// 初始化
export function saveConfig(): void {
    const gameStore = useGameStore()
    const gameConfig: GameConfig = {
        count: gameStore.count,
        playerList: gameStore.playerList,
        playerListMap: Object.fromEntries(gameStore.playerListMap),
        seatList: gameStore.seatList,
        continuingIntoWest: gameStore.continuingIntoWest,
        bankruptcy: gameStore.bankruptcy,
        negativeRiichi: gameStore.negativeRiichi,
        startPoint: gameStore.startPoint,
        returnPoint: gameStore.returnPoint,
        playerListRef: gameStore.playerListRef,
        gameType: gameStore.gameType,
        startSeat: gameStore.startSeat
    };
    window.localStorage.setItem(configStore, JSON.stringify(gameConfig));
}

export function loadConfig(): void {
    const gameStore = useGameStore()
    var configString = window.localStorage.getItem(configStore);
    if (configString == undefined) {
        return
    }
    const gameConfig: GameConfig = JSON.parse(configString);
    gameStore.count = gameConfig.count;
    gameStore.playerList = gameConfig.playerList;
    let tempPlayerListMap = Object.entries<number>(gameConfig.playerListMap)
    gameStore.playerListMap = new Map<string, number>();
    for (const values of tempPlayerListMap as [string, number][]) {
        gameStore.playerListMap.set(values[0], values[1]);
    }
    gameStore.seatList = gameConfig.seatList;
    gameStore.continuingIntoWest = gameConfig.continuingIntoWest;
    gameStore.bankruptcy = gameConfig.bankruptcy;
    gameStore.negativeRiichi = gameConfig.negativeRiichi;
    gameStore.startPoint = gameConfig.startPoint;
    gameStore.returnPoint = gameConfig.returnPoint;
    gameStore.playerListRef = reactive(gameConfig.playerListRef);
    gameStore.gameType = gameConfig.gameType;
    gameStore.startSeat = gameConfig.startSeat;
}

export function saveHistory(newResult: HistoryData): void {
    var history = readHistory();
    history.push(newResult);
    window.localStorage.setItem(historyStore, JSON.stringify(history));
};

export function readHistory(): HistoryData[] {
    var historyString = window.localStorage.getItem(historyStore);
    if (historyString == null) {
        return []
    }
    return JSON.parse(historyString);
};

export function setHistory(historyDataList: HistoryData[]): void {
    window.localStorage.setItem(historyStore, JSON.stringify(historyDataList));
}

