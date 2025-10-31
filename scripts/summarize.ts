import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleConsumeData } from './handleConsume.ts'
import { handleEquipData } from './handleEquip.ts'
import { handleEtcData } from './handleEtc.ts'
import { handleInstallData } from './handleInstall.ts'
import mobStrings from './rawData/String.wz/Mob.img.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mobInputDir = path.join(__dirname, 'rawData/Mob.wz')
const equipInputDir = path.join(__dirname, 'rawData/Character.wz')
const outputFile = path.join(__dirname, 'handlingData/mobs.json')

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

async function handleMobData() {
  try {
    const organizedData: MobType[] = []
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
          const base64Img = jsonData.stand
            ? fixBase64String(jsonData.stand[0]._image)
            : jsonData.move
              ? fixBase64String(jsonData.move[0]._image)
              : null

          if (base64Img == null)
            return

          const img = fixBase64String(base64Img)

          // 4. 「整理」資料：以「檔名 (不含 .json)」作為 Key
          const fileKey = path.basename(fileName, '.img.json')
          console.log(`Mob ID: ${fileKey}`, mobStrings[fileKey].name._value)
          if (mobStrings[fileKey] == null)
            return

          organizedData.push({
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
          })
        }
        catch (parseError) {
          console.error(`Error parsing JSON file: ${fileName}\n`, parseError)
        }
      }),
    )

    organizedData.sort((a, b) => a.id - b.id)
    const outputJsonString = JSON.stringify(organizedData, null, 2)

    await fs.writeFile(outputFile, outputJsonString, 'utf-8')

    console.log(
      `\n✅ Success! combined ${organizedData.length}/${jsonFiles.length} files into ${outputFile}`,
    )
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}

async function main() {
  await handleEquipData()
  // await handleConsumeData()
  // await handleEtcData()
  // await handleInstallData()
  // await handleMobData()
}

main()
