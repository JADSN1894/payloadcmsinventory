import { readCSV } from '@/helpers/csv'
import config from '@/payload.config'
import { createMediaFromImageUrl } from '@/scripts/seed/lib/create-media-from-image-url'
import { faker } from '@faker-js/faker'
import { readFileSync } from 'fs'
import { getPayload } from 'payload'
import { slugify } from 'payload/shared'

async function importData() {

  const payload = await getPayload({ config })

  const rawData = readFileSync('src/seeders/laboratories/laboratories.json', 'utf-8')
  const importData = JSON.parse(rawData)

  for (const data of importData) {
    console.log(`Creating ${JSON.stringify(data, null)}`)

       const title = faker.lorem.sentence()
    try {
      const createdData = await payload.create({
        collection: 'laboratories',
        data: {
          // id: Number(data?.id),
          title: title,
          slug: slugify(title),
        },
        draft: true,
      })

      console.log('Successful creation', createdData.createdAt)
    } catch (error) {
      console.error(error)
    }
  }
}

importData()
