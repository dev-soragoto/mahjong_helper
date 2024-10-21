import { Player } from '@/ts/common'
import { defineStore } from 'pinia'

export const historyStore = "history"

export const useGameStore = defineStore("game", {
    state: () => {
        return{
            count: 0,
            playerList: new Map<string, object>(),
            continuingIntoWest: true,
            bankruptcy: true,
            negativeRiichi: false,
            startPoint: 25000,
            returnPoint: 30000
        }
    },

    actions: {
        setPlayer(player: Player) {
            this.playerList.set(player.name, player)
            this.count = this.playerlist.size
        },
        deletePlayer(name) {
            if (this.playerList.delete(name)) {
                this.count = this.playerlist.size
            }
            else {
                alert("用户不存在！")
            }
        },
        getPlayer(name): Player {
            return this.playerList.get(name)
        },
        getResult(): Map<string, number> {
            var result = new Map<string, number>()
            for (const [key, value] of this.playerList.entries()) {
                result.set(key, value.point)
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

