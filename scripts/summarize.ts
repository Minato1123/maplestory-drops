import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleConsumeData } from './handleConsume.ts'
import { handleEquipData } from './handleEquip.ts'
import { handleEtcData } from './handleEtc.ts'
import { handleInstallData } from './handleInstall.ts'
import dropdata from './rawData/dropdata.json' with { type: 'json' }
import mobStrings from './rawData/String.wz/Mob.img.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mobInputDir = path.join(__dirname, 'rawData/Mob.wz')
const itemOutputFile = path.join(__dirname, 'items.json')
const outputFile = path.join(__dirname, 'mobs.json')

// 商城現金道具可以篩掉？ cash=1

export function fixBase64String(icon: string): string {
  return icon.replaceAll('\\u002B', '+')
}

interface MobType {
  id: number
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
}

async function handleMobData(allItems: Record<number, {
  type: 'equip' | 'use' | 'scroll' | 'etc' | 'setup'
  name: string
  img: string
  isQuest: boolean
  job?: number[]
  reqLevel?: number
  sfx?: string
  success?: number
}>) {
  try {
    const organizedData: MobType[] = []
    const linkedImgData: MobType[] = []
    const allFiles = await fs.readdir(mobInputDir)

    const jsonFiles = allFiles.filter(
      file => path.extname(file).toLowerCase() === '.json',
    )

    console.log(`Found ${jsonFiles.length} JSON files to process...`)

    await Promise.all(
      jsonFiles.map(async (fileName) => {
        const filePath = path.join(mobInputDir, fileName)

        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')

          const jsonData = JSON.parse(fileContent)
          const base64Img = jsonData.stand && jsonData.stand[0]._image
            ? fixBase64String(jsonData.stand[0]._image)
            : jsonData.move && jsonData.move[0]._image
              ? fixBase64String(jsonData.move[0]._image)
              : jsonData.stop && jsonData.stop[0]._image
                ? fixBase64String(jsonData.stop[0]._image)
                : jsonData.fly && jsonData.fly[0]._image
                  ? fixBase64String(jsonData.fly[0]._image)
                  : jsonData.info.link
                    ? jsonData.info.link._value
                    : null

          if (base64Img == null)
            return

          const img = fixBase64String(base64Img)

          // 4. 「整理」資料：以「檔名 (不含 .json)」作為 Key
          const fileKey = path.basename(fileName, '.img.json')
          console.log(`Mob ID: ${fileKey}`, mobStrings[fileKey].name._value)
          if (mobStrings[fileKey] == null)
            return

          const dropData = {
            equip: [],
            use: [],
            scroll: [],
            etc: [],
            setup: [],
          }

          const drops = dropdata.filter(drop => drop.dropperid === Number(fileKey))
          drops.forEach((drop) => {
            const item = allItems[drop.itemid]
            if (item == null)
              return

            dropData[item.type].push(drop.itemid)
          })

          const theMobData = {
            id: Number(fileKey),
            name: mobStrings[fileKey].name._value,
            img,
            info: {
              level: jsonData.info.level._value,
              hp: jsonData.info.maxHP._value,
              mp: jsonData.info.maxMP._value,
              exp: jsonData.info.exp?._value ?? 0,
              wdef: jsonData.info.PDDamage._value,
              mdef: jsonData.info.MDDamage._value,
              acc: jsonData.info.acc._value,
              eva: jsonData.info.eva._value,
            },
            dropData,
          }
          if (theMobData.img.length <= 8)
            linkedImgData.push(theMobData)
          else organizedData.push(theMobData)
        }
        catch (parseError) {
          console.error(`Error parsing JSON file: ${fileName}\n`, parseError)
        }
      }),
    )

    const fixedLinkedData = linkedImgData.map((mob) => {
      return {
        ...mob,
        img: organizedData.find(data => `${data.id}` === mob.img)?.img,
      }
    })
    const finalData = [...organizedData, ...fixedLinkedData]
    finalData.sort((a, b) => a.id - b.id)
    const outputJsonString = JSON.stringify(finalData, null, 2)

    await fs.writeFile(outputFile, outputJsonString, 'utf-8')

    console.log(
      `\n✅ Success! combined ${finalData.length}/${jsonFiles.length} files into ${outputFile}`,
    )
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}

async function main() {
  await handleEquipData()
  await handleConsumeData()
  await handleEtcData()
  await handleInstallData()

  const equipData = await import('./handlingData/equipItems.json', {
    with: { type: 'json' },
  })
  const consumeData = await import('./handlingData/consumeItems.json', {
    with: { type: 'json' },
  })
  const etcData = await import('./handlingData/etcItems.json', {
    with: { type: 'json' },
  })
  const installData = await import('./handlingData/installItems.json', {
    with: { type: 'json' },
  })

  const allItems = {
    ...equipData.default,
    ...consumeData.default,
    ...etcData.default,
    ...installData.default,
  }

  const outputJsonString = JSON.stringify(allItems, null, 2)
  await fs.writeFile(itemOutputFile, outputJsonString, 'utf-8')

  await handleMobData(allItems)
}

main()
