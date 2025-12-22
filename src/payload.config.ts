// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media/config'
import { env } from './lib/env'
import { Articles } from './collections/Articles/config'
import { ArticleAuthors } from './collections/ArticleAuthors/config'
import { CSVData } from './collections/CsvData/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        autoLogin: {
            email: env.CMS_SEED_ADMIN_EMAIL,
            password: env.CMS_SEED_ADMIN_PASSWORD,
        },
    },
    collections: [Users, Media, Articles, ArticleAuthors, CSVData],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        allowIDOnCreate: false,
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
    sharp,
    plugins: [
        // storage-adapter-placeholder
    ],
    cors: ['0.0.0.0:3000'],
    csrf: ['0.0.0.0:3000'],
})
