import { seedAdmin } from './seeders/admin.seeder'
import { seedLaboratories } from './seeders/laboratories.seeder'
import { seedExperiments } from './seeders/experiments.seeder'

async function main() {
  try {
    await seedAdmin()
    await seedLaboratories()
    await seedExperiments()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

void main()
