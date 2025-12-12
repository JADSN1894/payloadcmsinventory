import config from '@/payload.config'
import { getPayload, Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { slugify } from 'payload/shared'

export async function seedLaboratories() {

    const payload = await getPayload({ config })
  
  try {
    for (let index = 1; index <= 5; index++) {
      const title = faker.lorem.sentence({ min: 3, max: 5 })
      const response = await payload.create({
        collection: 'laboratories',
        data: {
          // id: Number(data?.id),
          title,
          slug: slugify(title),
        },
        draft: true,
      })
      console.log('Laborotary created:', response)
    }
  } catch (error) {
    console.error('Error seeding Laborotary:', JSON.stringify(error, null, 2))
  }
}
