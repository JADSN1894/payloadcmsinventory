// import { Payload } from 'payload'
// import { faker } from '@faker-js/faker'
// import { createMediaFromImageUrl } from '@/scripts/seed/lib/create-media-from-image-url'

// export async function seedExperiments(payload: Payload) {
//   try {
//     const rawData = Array.from({ length: 10 }, (item) => item)

//     for (const _ of rawData) {
//       const imageUrl = faker.image.urlPicsumPhotos()
//       const image = await createMediaFromImageUrl(payload, imageUrl)

//       if (!image) {
//         console.warn('Stopped seeding article author because no image was created')
//         return
//       }

//       try {
//         const createdData = await payload.create({
//           collection: 'experiments',
//           data: {
//             laboratory: faker.number.int({ min: 1, max: 5 }),
//             qtde: faker.number.int({ min: 1, max: 100 }),
//             description: faker.lorem.sentence({ min: 3, max: 10 }),
//             coverImage: image.id,
//           },
//           // filePath: `./payload-media/${image.id}`,
//           draft: true,
//         })

//         console.log('Experiment created', createdData.createdAt)
//       } catch (error) {
//         console.error(error)
//       }
//     }
//   } catch (error) {
//     console.error('Error seeding Experiments:', JSON.stringify(error, null, 2))
//   }
// }

// // npm run payload run scripts/seed.js

import config from '@/payload.config'
import { faker } from '@faker-js/faker'
import { getPayload } from 'payload'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'
import { Media } from '@/payload-types'

export async function seedExperiments() {
  const rawData = Array.from({ length: 10 }, (item) => item)

  const payload = await getPayload({ config })

  for (const _ of rawData) {
    // console.log(`Creating ${JSON.stringify(data, null)}`)
    const imageUrl = faker.image.urlPicsumPhotos()
    const image = await createMediaFromImageUrl(payload, imageUrl)

    if (!image) return;

    try {
      const createdData = await payload.create({
        collection: 'experiments',
        data: {
          laboratory: faker.number.int({ min: 1, max: 5 }),
          qtde: faker.number.int({ min: 1, max: 100 }),
          description: faker.lorem.sentence({ min: 3, max: 10 }),
          coverImage: image,
        },
        // filePath: `./payload-media/${image.id}`,
        // draft: true,
      })

      //         console.log('Experiment created', createdData.createdAt)

      console.log('Successful creation', JSON.stringify(createdData, null))
    } catch (error) {
      console.error(error)
    }
  }
}
