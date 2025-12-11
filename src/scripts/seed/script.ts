import { getPayloadClient } from '@/lib/payload/client'
import { seedAdmin } from './seeders/admin.seeder'
import { seedLaboratories } from './seeders/laboratories.seeder'
import { seedExperiments } from './seeders/experiments/experiments.seeder'

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload)
        await seedLaboratories(payload)
        await seedExperiments(payload)
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

void main()