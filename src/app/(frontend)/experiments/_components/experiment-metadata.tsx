import { Media } from '@/payload-types'
import Image from 'next/image'

export function ExperimentMetadata({
    data,
    intent,
    className,
}: {
    data: {
        // laboratory: number,
        qtde: number,
        description: string,
        coverImage: Media
    }
    intent: 'card' | 'post'
    className?: string
}) {
    const { qtde, description, coverImage } = data

    return (
        <div className={`mt-4 flex items-center justify-between ${className}`}>
            {/* author */}
            <div className={`flex items-center ${intent === 'card' ? 'gap-2' : 'gap-3'}`}>
                {/* author avatar */}
                <Image
                    src={coverImage.url ?? ''}
                    alt={`${coverImage.filename}`}
                    width={40}
                    height={40}
                    className={`rounded-full ${intent === 'card' ? 'size-10' : 'size-11'}`}
                    sizes="40px"
                />

                {/* author name, role */}
                <div
                    className={`flex flex-col leading-none ${intent === 'card' ? 'text-sm gap-1.5' : 'text-base gap-2'}`}
                >
                    <p className="font-bold">{description}</p>
                    <p className="text-dimmed">{qtde}</p>
                </div>
            </div>
        </div>
    )
}