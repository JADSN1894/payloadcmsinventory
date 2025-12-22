import Image from 'next/image'
import { ArticleMetadata } from '../_components/article-metadata'
import { getArticleBySlug } from '@/collections/Articles/fetchers'
import { notFound } from 'next/navigation'
import { relationIsObject } from '@/lib/payload/helpers/relation-is-object'
import { RichTextField } from '@payloadcms/richtext-lexical/client'
import { RichText } from '@/lib/payload/components/rich-text'
import { TableExperimentItens } from './_components/table'
import { CsvDatum } from '@/payload-types'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = await getArticleBySlug(slug)
    if (!article) notFound()

    let { headers, rows }: CsvDatum = article.csvSourcFileItens as CsvDatum

    let headersValuesArg = headers?.map((header) => header.data) ?? []
    let rowsValuesOfValues = rows!.map((row) => ({
        values: row.data!.map(({ data }) => data!),
    }))
    let rowsValuesArg: string[][] = rowsValuesOfValues.map((rows) => rows.values)

    // console.log(headersValuesArg, rowsValuesArg)

    if (!relationIsObject(article.coverImage)) return null
    if (!relationIsObject(article.author) || !relationIsObject(article.author.avatar)) {
        return null
    }

    return (
        <div className="prose lg:prose-lg dark:prose-invert">
            {/* title */}
            <h1>{article.title}</h1>

            {/* metadata */}
            <ArticleMetadata
                intent="post"
                data={{
                    author: {
                        avatar: article.author.avatar,
                        name: article.author.name,
                        role: article.author.role,
                    },
                    publishedAt: new Date(article.publishedAt ?? new Date()),
                    readTimeMins: article.readTimeInMins ?? 0,
                }}
                className="not-prose"
            />

            {/* cover image */}
            <Image
                src={article.coverImage.url ?? ''}
                alt="Cover image"
                width={600}
                height={300}
                className="w-full rounded-md object-center object-cover"
                placeholder="blur"
                blurDataURL={article.coverImage.blurDataUrl}
            />

            {/* content */}
            <RichText lexicalData={article.content} />

            <TableExperimentItens
                headers={headersValuesArg}
                rows={rowsValuesArg}
            ></TableExperimentItens>
        </div>
    )
}
