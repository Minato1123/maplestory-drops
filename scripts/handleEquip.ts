import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import strings from './rawData/String.wz/Eqp.img.json' with { type: 'json' }
import { fixBase64String } from './summarize.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputFile = path.join(__dirname, 'handlingData/equipItems.json')

/**
 * 將 MapleStory 的職業代碼 (Bitmask) 轉換為易讀的陣列
 * @param jobCode - 來自 JSON 的十進位職業代碼 (例如 10)
 * @returns 一個包含職業 ID 的陣列 (例如 [2, 4])
 */
function convertJobCode(jobCode: number): number[] {
  if (jobCode === -1) {
    return [-1]
  }
  // 1. 定義「位元 (bit)」和「您想要的 ID」之間的映射
  // [位元遮罩值] : [您想要的職業 ID]
  const JOB_MAP = {
    1: 1, // 00001 (十進位 1)  -> 劍士 [1]
    2: 2, // 00010 (十進位 2)  -> 法師 [2]
    4: 3, // 00100 (十進位 4)  -> 弓箭手 [3]
    8: 4, // 01000 (十進位 8)  -> 盜賊 [4]
    16: 5, // 10000 (十進位 16) -> 海盜 [5]
  }

  const ALL_JOBS = [1, 2, 3, 4, 5]

  // 2. 處理您的特殊規則：「0 = 全職業」
  // (在 MapleStory 中，0 通常代表「新手」，但我們依照您的規則)
  if (jobCode === 0) {
    return ALL_JOBS
  }

  const result: number[] = []

  // 3. 遍歷所有可能的位元值
  // (我們使用 Object.keys 來遍歷 JOB_MAP)
  for (const bitKey of Object.keys(JOB_MAP)) {
    const bitValue = Number(bitKey) // (bitValue 會是 1, 2, 4, 8, 16)

    // 4. 核心：使用「位元 AND (&)」運算子
    //    這會檢查 jobCode 中是否「包含」這個位元
    //    例如：(10 & 2) > 0  -> (1010 & 0010) = 0010 (true)
    //    例如：(10 & 4) > 0  -> (1010 & 0100) = 0000 (false)
    if ((jobCode & bitValue) > 0) {
      // 如果包含，就把您想要的 ID (例如 2)推進陣列
      result.push(JOB_MAP[bitValue])
    }
  }

  // 5. 處理「全職業」的另一種情況 (1+2+4+8+16 = 31)
  //    如果陣列長度為 5，我們就直接回傳 [1, 2, 3, 4, 5]
  //    這能處理 jobCode === 31 (二進位 11111) 的情況
  if (result.length === 5) {
    return ALL_JOBS
  }

  return result
}

const folders = ['Accessory', 'Cap', 'Cape', 'Coat', 'Dragon', 'Glove', 'Longcoat', 'Pants', 'Ring', 'Shoes', 'Shield', 'Weapon']

export async function handleEquipData() {
  const organizedData: Record<number, {
    type: 'equip' | 'use' | 'scroll' | 'etc' | 'setup'
    name: string
    img: string
    isQuest: boolean
    job?: number[]
    reqLevel?: number
    sfx?: string
    success?: number
  }> = {}
  let totalItems = 0

  try {
    for (const folder of folders) {
      const inputDir = path.join(__dirname, `rawData/Character.wz/${folder}`)

      const allFiles = await fs.readdir(inputDir)
      totalItems += allFiles.length
      const jsonFiles = allFiles.filter(
        file => path.extname(file).toLowerCase() === '.json',
      )

      console.log(`Found ${jsonFiles.length} JSON files to process...`)

      await Promise.all(
        jsonFiles.map(async (fileName) => {
          const filePath = path.join(inputDir, fileName)
          const fileContent = await fs.readFile(filePath, 'utf-8')

          const jsonData = JSON.parse(fileContent)
          const base64Img = jsonData.info.icon._image
          if (base64Img == null)
            return

          const img = fixBase64String(base64Img)

          const fileKey = Number(path.basename(fileName, '.img.json'))
          // console.log(`Item ID: ${fileKey}`, strings.Eqp[folder][`${fileKey}`].name._value)
          if (strings.Eqp[folder][fileKey] == null)
            return

          organizedData[fileKey] = {
            name: strings.Eqp[folder][`${fileKey}`].name._value,
            img,
            type: 'equip',
            job: jsonData.info.reqJob == null ? undefined : convertJobCode(jsonData.info.reqJob._value),
            reqLevel: jsonData.info.reqLevel?._value,
            sfx: jsonData.info.sfx?._value,
          }
        }),
      )
    }

    const outputJsonString = JSON.stringify(organizedData, null, 2)
    await fs.writeFile(outputFile, outputJsonString, 'utf-8')

    console.log(
      `\n✅ Success! combined ${Object.keys(organizedData).length}/${totalItems} files into ${outputFile}`,
    )
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}
