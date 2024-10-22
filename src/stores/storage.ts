import { Player } from '@/ts/common'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';

export const historyStore = "history"

export const useGameStore = defineStore("game", {
    state: () => {
        return{
            count: 0,
            playerList: reactive(new Array<object>()),
            playerListMap: new Map<string, number>(),
            continuingIntoWest: true,
            bankruptcy: true,
            negativeRiichi: false,
            startPoint: 25000,
            returnPoint: 30000,
            playerListRef: reactive(new Array<object>())
        }
    },

    actions: {
        setPlayer(name:string, player: Player): boolean {
            if (this.playerListMap.has(player.name)) {
                return false
            }
            if (this.playerListMap.has(name)) {
                var index = this.playerListMap.get(name)
                this.playerListMap.delete(name)
                this.playerListMap.set(player.name, index)
                this.playerList[index].name = player.name
                this.playerList[index].seat = player.seat
                this.playerList[index].point = player.point
                this.playerList[index].riichi = player.riichi
            }
            else {
                this.playerListRef.push(
                    {
                        visible: false,
                        inputModel: ref(''),
                        key: ref(0)
                    }
                )                
                this.playerList.push(player)
                this.count = this.playerList.length
                this.playerListMap.set(player.name, this.count - 1)
            }
            return true
        },
        deletePlayer(name: string) {
            if (this.playerListMap.has(name)) {
                var n = this.playerListMap.get(name)
                this.playerListMap = new Map<string, number>()
                this.playerListRef.splice(n, 1)
                this.playerList.splice(n, 1)
                for (let index = 0; index < this.playerList.length; index++) {
                    this.playerListMap.set(this.playerList[index].name, index)
                }
                this.count = this.playerList.size
            }
        },
        getPlayer(name: string): Player {
            return this.playerList[this.playerListMap.get(name)]
        },
        getPlayerRef(name: string): object {
            return this.playerListRef[this.playerListMap.get(name)]
        },
        setPlayerRef(name: string, visible: boolean): void {
            this.playerListRef[this.playerListMap.get(name)].visible = visible
        },
        getResult(): Map<string, number> {
            var result = new Map<string, number>()
            for (const player of this.playerList) {
                result.set(player.name, player.point)
            }

            return result
        },
        setConfig(continuingIntoWest, bankruptcy, negativeRiichi, startPoint, returnPoint) {
            this.continuingIntoWest = continuingIntoWest
            this.bankruptcy = bankruptcy
            this.negativeRiichi = negativeRiichi
            this.startPoint = startPoint
            this.returnPoint = returnPoint
        }
    }
})

export function saveHistory(gameStore): void {
    var newResult = gameStore.getResult()
    var history = readHistory()
    history.push(newResult)
    window.localStorage.setItem(historyStore, JSON.stringify(history))
}

export function readHistory(): Array<object> {
    var historyString = window.localStorage.getItem(historyStore)
    return JSON.parse(historyString)
}

