export class Player {
    name: string
    seat: string
    point: number
    riichi: boolean
}

export function genNonDuplicateID(){
    return Math.random().toString(36).substring(2, 8)
}
