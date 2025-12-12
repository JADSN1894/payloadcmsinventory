import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ExperimentMetadata } from './experiment-metadata'

type ExperimentCardProps = {
  href: string
  experiment: {
    // laboratory: number
    qtde: number
    description: string
    coverImage: Media
  }
}

export function ExperimentCard({ href, experiment }: ExperimentCardProps) {
  return (
    <Link href={href} aria-label={`Read article: "${experiment.description}"`} className="block">
      <article className="rounded-md border border-gray-700 overflow-hidden h-full flex flex-col">
        {/* cover image */}
        <Image
          src={experiment.coverImage.url ?? ''}
          alt={`Cover image for "${experiment.description}"`}
          width={600}
          height={300}
          className="h-[200px] object-cover object-center w-full"
          placeholder="blur"
          blurDataURL={experiment.coverImage.blurDataUrl}
        />

        {/* content */}
        <div className="p-3 flex-1 flex flex-col gap-5">
          <header>
            {/* title */}
            <h2 className="font-bold text-lg">{experiment.description}</h2>
            {/* summary */}
            {/* <p className="mt-2">{summary}</p> */}
          </header>

          <ExperimentMetadata intent="card" data={experiment} className="mt-auto" />
        </div>
      </article>
    </Link>
  )
}

export function ExperimentCardSkeleton() {
  return <div className="rounded-md h-[350px] animate-pulse bg-gray-700" />
}
