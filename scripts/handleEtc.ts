import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import etcStrings from './rawData/String.wz/Etc.img.json' with { type: 'json' }
import { fixBase64String } from './summarize.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const etcInputDir = path.join(__dirname, 'rawData/Item.wz/Etc')
const etcOutputFile = path.join(__dirname, 'handlingData/etcItems.json')

export async function handleEtcData() {
  try {
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
    const allFiles = await fs.readdir(etcInputDir)

    const jsonFiles = allFiles.filter(
      file => path.extname(file).toLowerCase() === '.json',
    )

    console.log(`Found ${jsonFiles.length} JSON files to process...`)

    await Promise.all(
      jsonFiles.map(async (fileName) => {
        const filePath = path.join(etcInputDir, fileName)

        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')

          const jsonData = JSON.parse(fileContent)
          for (const [key, item] of Object.entries(jsonData)) {
            const id = Number(key)
            const base64Img = item.info.icon._image
            if (base64Img == null)
              continue

            const img = fixBase64String(base64Img)

            if (id == null)
              continue

            console.log(etcStrings.Etc[`${id}`].name._value)

            organizedData[id] = {
              type: 'etc',
              name: etcStrings.Etc[`${id}`].name._value,
              img,
            }
          }
        }
        catch (parseError) {
          console.error(`Error parsing JSON file: ${fileName}\n`, parseError)
        }
      }),
    )

    const outputJsonString = JSON.stringify(organizedData, null, 2)
    await fs.writeFile(etcOutputFile, outputJsonString, 'utf-8')

    console.log(
      `\n✅ Success! combined ${Object.keys(organizedData).length}/${jsonFiles.length} files into ${etcOutputFile}`,
    )
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}
