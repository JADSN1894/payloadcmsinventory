import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { readCSV } from '@/helpers/csv'
import { createMediaFromImageUrl } from '@/scripts/seed/lib/create-media-from-image-url'

export async function seedExperiments(payload: Payload) {
    try {

      const rawData = await readCSV('src/scripts/seed/seeders/experiments/data.csv', ';')

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
              collection: 'experiments',
              data: {
                laboratory: faker.number.int({ min: 1, max: 5 }),
                qtde: data?.qtde,
                description: data.description,
                coverImage: image.id
              },
              draft: true,
            })
      
            console.log('Experiment created', createdData.createdAt)
          } catch (error) {
            console.error(error)
          }
        }
      
    } catch (error) {
      console.error('Error seeding Experiments:', JSON.stringify(error, null, 2))
    }
}