import { Player } from '@/ts/common'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';

export const historyStore = 'history';
export const configStore = 'config'

export const useGameStore = defineStore('game', {
    state: () => {
        return{
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
            playerListRef: reactive<Array<object>>(new Array<object>()),
            gameType: 'halfGame',
            startSeat: ref<number>(0)
        }
    },

    actions: {
        setPlayer(name:string, player: Player): boolean {
            if (this.playerListMap.has(player.name)) {
                return false;
            }
            if (this.playerListMap.has(name)) {
                var index = this.playerListMap.get(name);
                this.playerListMap.delete(name);
                this.playerListMap.set(player.name, index);
                this.playerList[index].name = player.name;
                this.playerList[index].seat = player.seat;
                this.playerList[index].point = player.point;
                this.playerList[index].riichi = player.riichi;
                for (var i = 0; i < this.seatList.length; i++) {
                    if (this.seatList[i] === name) {
                        this.seatList[i] = player.name
                    } 
                }
            }
            else {
                this.playerListRef.push(
                    {
                        visible: false,
                        inputModel: ref<string>(''),
                        key: ref<number>(0)
                    }
                );    
                this.playerList.push(player);
                this.count = this.playerList.length;
                this.playerListMap.set(player.name, this.count - 1);
            }
            return true
        },
        deletePlayer(name: string) {
            if (this.playerListMap.has(name)) {
                var n = this.playerListMap.get(name);
                this.playerListMap = new Map<string, number>();
                this.playerListRef.splice(n, 1);
                this.playerList.splice(n, 1);
                for (let index = 0; index < this.playerList.length; index++) {
                    this.playerListMap.set(this.playerList[index].name, index);
                }
                this.count = this.playerList.length;
            }
        },
        resetPlayer() {
            for (let i = 0; i < this.count; i++) {
                this.playerList[i].point = this.startPoint
            }
        },
        getPlayer(name: string): Player {
            return this.playerList[this.playerListMap.get(name)];
        },
        getPlayerRef(name: string): object {
            return this.playerListRef[this.playerListMap.get(name)];
        },
        setPlayerRef(name: string, visible: boolean): void {
            this.playerListRef[this.playerListMap.get(name)].visible = visible;
        },
        getResult(): {timeStamp: number, record: string [][]} {
            var result = {
                timeStamp: Date.now(), 
                record: []
            }
            for (const player of this.playerList) {
                result.record.push([player.name, (String)(player.point)])
            }

            return result;
        },
        getSeat(index: number): Player {
            return this.playerList[this.playerListMap.get(this.seatList[index])];
        },
        setConfig(continuingIntoWest, bankruptcy, negativeRiichi, startPoint, returnPoint) {
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

interface GameConfig {
    count: number,
    playerList: Array<Player>,
    playerListMap: object,
    seatList: Array<string>,
    continuingIntoWest: boolean,
    bankruptcy: boolean,
    negativeRiichi: boolean,
    startPoint: number,
    returnPoint: number,
    playerListRef: Array<object>,
    gameType: string,
    startSeat: number
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
    console.log('loadConfig')
    console.log(configString)
    if(configString == undefined) {
        return
    }
    const gameConfig: GameConfig = JSON.parse(configString);
    gameStore.count = gameConfig.count;
    gameStore.playerList = gameConfig.playerList;
    gameStore.playerListMap = new Map<string, number>();
    for (const key of Object.keys(gameConfig.playerListMap)) {
        gameStore.playerListMap.set(key, gameConfig.playerListMap[key]);
    }
    gameStore.seatList = gameConfig.seatList;
    gameStore.continuingIntoWest = gameConfig.continuingIntoWest;
    gameStore.bankruptcy = gameConfig.bankruptcy;
    gameStore.negativeRiichi = gameConfig.negativeRiichi;
    gameStore.startPoint = gameConfig.startPoint;
    gameStore.returnPoint = gameConfig.returnPoint;
    gameStore.playerListRef = gameConfig.playerListRef;
    gameStore.gameType = gameConfig.gameType;
    gameStore.startSeat = gameConfig.startSeat;
}

export function saveHistory(): void {
    const gameStore = useGameStore()
    var newResult = gameStore.getResult();
    var history = readHistory();
    if (history == null) {
        history = [];
    }
    history.push(newResult);
    window.localStorage.setItem(historyStore, JSON.stringify(history));
};

export function readHistory(): Array<object> {
    var historyString = window.localStorage.getItem(historyStore);
    return JSON.parse(historyString);
};

