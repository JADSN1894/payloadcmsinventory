import { readCSV } from '@/helpers/csv'
import config from '@/payload.config'
import { createMediaFromImageUrl } from '@/scripts/seed/lib/create-media-from-image-url'
import { faker } from '@faker-js/faker'
import { getPayload } from 'payload'

async function importData() {
  const rawData = await readCSV('src/seeders/data.csv', ';')
  // const importData = JSON.parse(rawData)
  console.log(importData)

  const payload = await getPayload({ config })

  for (const data of rawData) {
    console.log(`Creating ${JSON.stringify(data, null)}`)

    const imageUrl = faker.image.urlPicsumPhotos()
    const image = await createMediaFromImageUrl(payload, imageUrl)
    if (!image) {
      console.warn('Stopped seeding article author because no image was created')
      return
    }

    try {
      const createdData = await payload.create({
        collection: 'books',
        data: {
          qtde: data?.qtde,
          description: data.description,
          coverImage: image.id,
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
