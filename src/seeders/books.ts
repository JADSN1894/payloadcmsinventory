// npm run payload run scripts/seed.js

import config from '@/payload.config'
import { readFileSync } from 'fs'
import { getPayload } from 'payload'

async function importData() {
  const rawData = readFileSync('src/seeders/data.json', 'utf-8')
  const importData = JSON.parse(rawData)
  console.log(importData)

  const payload = await getPayload({ config })

  for (const data of importData) {
    console.log(`Creating ${JSON.stringify(data, null)}`)

    try {
      const createdData = await payload.create({
        collection: 'books',
        data: {
          qtde: data.qtde,
          description: data.description,
        },
      })

      console.log('Successful creation', createdData.createdAt)
    } catch (error) {
      console.error(error)
    }
  }
}

importData()