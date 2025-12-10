import { readCSV } from '@/helpers/csv'
import config from '@/payload.config'
import { getPayload } from 'payload'

async function importData() {
  const rawData  = await readCSV('src/seeders/data.csv', ';')
  // const importData = JSON.parse(rawData)
  console.log(importData)

  const payload = await getPayload({ config })

  for (const data of rawData) {
    console.log(`Creating ${JSON.stringify(data, null)}`)

    try {
      const createdData = await payload.create({
        collection: 'books',
        data: {
          qtde: data?.qtde,
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