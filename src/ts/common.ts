import type { Ref } from 'vue';

export interface Player {
    name: string
    seat: string
    point: number
    riichi: boolean
}

export interface PlayerRef {
    visible: boolean,
    inputModel: string,
    key: number
}

export function genNonDuplicateID(){
    return Math.random().toString(36).substring(2, 8)
}
