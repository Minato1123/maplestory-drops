export interface MobType {
  id: string
  name: string
  img: string
  info: {
    level: number
    hp: number
    mp: number
    exp: number
    wdef: number
    mdef: number
    acc: number
    eva: number
  }
  dropData: {
    equip: number[]
    use: number[]
    scroll: number[]
    etc: number[]
    setup: number[]
  }
}

export interface ItemInfoType {
  isQuest: boolean
  img: string
  name: string
  job?: [-1] | (1 | 2 | 3 | 4 | 5)[]
  reqLevel: number
  sfx?: string
  type: 'equip' | 'use' | 'scroll' | 'etc' | 'setup'
  success: number
}
