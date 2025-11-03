import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import consumeStrings from './rawData/String.wz/Consume.img.json' with { type: 'json' }
import { fixBase64String } from './summarize.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const consumeInputDir = path.join(__dirname, 'rawData/Item.wz/Consume')
const consumeOutputFile = path.join(__dirname, 'handlingData/consumeItems.json')

const regexPattern = /\.\.\/\.\.\/(\d+)\/info\/icon/

export async function handleConsumeData() {
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
    const allFiles = await fs.readdir(consumeInputDir)

    const jsonFiles = allFiles.filter(
      file => path.extname(file).toLowerCase() === '.json',
    )

    console.log(`Found ${jsonFiles.length} JSON files to process...`)

    await Promise.all(
      jsonFiles.map(async (fileName) => {
        const filePath = path.join(consumeInputDir, fileName)

        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')

          const jsonData = JSON.parse(fileContent)
          for (const [key, item] of Object.entries(jsonData)) {
            const id = Number(key)

            // const table = {
            //   '../../02040000/info/icon': jsonData['02040000'].info.icon._image,
            //   '../../02040001/info/icon': '',
            //   '../../02040002/info/icon': '',
            //   '../../02040008/info/icon': '',
            //   '../../02040009/info/icon': '',
            //   '../../02040019/info/icon': '',
            //   '../../02040020/info/icon': '',
            //   '../../02040110/info/icon': '',
            //   '../../02040315/info/icon': '',
            //   '../../02044713/info/icon': '',
            //   '../../02049200/info/icon': '',
            //   '../../02049201/info/icon': '',
            // }
            function getElseImage(iconPath: string) {
              const match = iconPath.match(regexPattern)
              return jsonData[match[1]].info.icon._image
            }

            const base64Img = item.info.icon._image == null ? getElseImage(item.info.icon._value) : item.info.icon._image
            if (base64Img == null)
              continue

            const img = fixBase64String(base64Img)

            if (id == null)
              continue

            console.log(consumeStrings[`${id}`].name._value)

            organizedData[id] = {
              type: key.startsWith('0204') ? 'scroll' : 'use',
              name: consumeStrings[`${id}`].name._value,
              img,
              success: item.info.success?._value,
            }
          }
        }
        catch (parseError) {
          console.error(`Error parsing JSON file: ${fileName}\n`, parseError)
        }
      }),
    )

    const outputJsonString = JSON.stringify(organizedData, null, 2)
    await fs.writeFile(consumeOutputFile, outputJsonString, 'utf-8')

    console.log(
      `\n✅ Success! combined ${Object.keys(organizedData).length}/${jsonFiles.length} files into ${consumeOutputFile}`,
    )
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}
