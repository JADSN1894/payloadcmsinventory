import { relationIsObject } from '@/lib/payload/helpers/relation-is-object'
import { getExperiments } from '@/collections/Experiements/fetchers'
import { ExperimentCard } from './_components/experiment-card'
import { Media } from '@/payload-types'

export default async function ExperimentIndexPage() {
  const experiments = await getExperiments()
  if (!experiments.length) {
    return <p>No experiments found</p>
  }


  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {experiments.map(({ id, laboratory, description, qtde, coverImage }) => {
        // if (!relationIsObject(coverImage)) return null

  console.log('EXPERIMENTS')
//         const coverImageNotNull: Media = coverImage ?? {
//   id: 9,
//   alt: 'accedo artificiose tendo',
//   blurDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAIAAADAusJtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGElEQVR4nGOwtLRkeP/+PUNvby8DJycnAC+MBTuRMQ2AAAAAAElFTkSuQmCC',
//   updatedAt: '2025-12-12T16:46:06.272Z',
//   createdAt: '2025-12-12T16:46:06.272Z',
//   url: '/api/media/file/1721.jpg',
//   thumbnailURL: null,
//   filename: '1721.jpg',
//   mimeType: 'image/jpeg',
//   filesize: 6557,
//   width: 341,
//   height: 1721,
//   focalX: 50,
//   focalY: 50
// };

        if (!coverImage) {
            console.log("No Image Foun at media");
            
        }
        
        console.log(coverImage);
        
        
        return (
          <ExperimentCard
            key={id}
            // title={title}
            href={`/experiments`}
            experiment={{
              coverImage: {
  id: 9,
  alt: 'accedo artificiose tendo',
  blurDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAIAAADAusJtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGElEQVR4nGOwtLRkeP/+PUNvby8DJycnAC+MBTuRMQ2AAAAAAElFTkSuQmCC',
  updatedAt: '2025-12-12T16:46:06.272Z',
  createdAt: '2025-12-12T16:46:06.272Z',
  url: '/api/media/file/1721.jpg',
  thumbnailURL: null,
  filename: '1721.jpg',
  mimeType: 'image/jpeg',
  filesize: 6557,
  width: 341,
  height: 1721,
  focalX: 50,
  focalY: 50
},
            //   laboratory: laboratory as number,
              qtde,
              description,
            }}
            // name: author.name,
            // role: author.role,
          />
        )
      })}
    </div>
  )
}
