const mobsSample = [
  {
    id: '0100100', // wz.json > Mob.wz
    name: 'Snail', // wz.json > String.wz > Mob.img.json
    img: 'base64', // wz.json > Mob.wz
    info: { // wz.json > Mob.wz
      level: 1,
      hp: 8,
      mp: 0,
      exp: 3,
      wdef: 12,
      mdef: 0,
      acc: 1,
      eva: 0,
    },
    drops: { // dropdata.json
      equip: [1002067],
      use: [],
      scroll: [2000000, 2040002],
      etc: [4000019],
    },
  },
]

const itemsSample = {
  1082242: {},
  1002067: {
    isQuest: false,
    img: 'base64', // wz.json > Item.wz
    name: 'Green Headband', // wz.json > String.wz > Eqp.img.json
    job: [1, 2, 3, 4, 5],
    reqLevel: 5,
    sfx: 'cap', // 不一定會有
    type: 'equip',
  },
  4000019: {
    isQuest: false,
    img: 'base64', // wz.json > Item.wz
    name: 'Snail Shell', // wz.json > String.wz > Etc.img.json
  },
  2000000: {
    isQuest: false,
    img: 'base64', // wz.json > Item.wz
    name: 'Red Potion', // wz.json > String.wz > Consume.img.json
  },
  2040002: {
    isQuest: false,
    img: 'base64', // wz.json > Item.wz
    name: 'Scroll for Helmet for DEF', // wz.json > String.wz > Consume.img.json
    type: 'scroll',
    success: 60,
  },
}
