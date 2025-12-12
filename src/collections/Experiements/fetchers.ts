import config from '@/payload.config'
import { getPayload } from 'payload'

export async function getExperiments() {
  const payload = await getPayload({ config })
  try {
    const { docs: experiments } = await payload.find({
      collection: 'experiments',
      select: {
        laboratory: true,
        qtde: true,
        contentSummary: true,
        description: true,
        coverImage: true,
      },
    })
    return experiments ?? []
  } catch (error) {
    console.error('Failed to fetch experiments', error)
    return []
  }
}
