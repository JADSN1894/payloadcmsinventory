import { getPayloadClient } from '@/lib/payload/client'
import { seedAdmin } from './seeders/admin.seeder'
import { seedArticleAuthor } from './seeders/article-author.seeder'
import { seedArticles } from './seeders/articles.seeder'
import { seedCsvData } from './seeders/csvData.seeder'
// import { seedCsvFile } from './seeders/csvfile.seeder'

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload)
        await seedCsvData(payload, ",")
        await seedArticleAuthor(payload)
        await seedArticles(payload)
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

void main()
