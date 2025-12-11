// import type { CollectionConfig } from 'payload'
// import { Experiment } from '@/payload-types'

// import { FieldHook } from 'payload'
// import { slugify } from 'payload/shared'
// import { revalidateTag } from 'next/cache'
// import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

// const generateSlugHook: FieldHook<Experiment, string> = ({ value, data }) => {
//   if (value) return slugify(value.trim()) || ''
//   return slugify(data?.title?.trim() || '') || ''
// }

// const generateDescriptionSummaryHook: FieldHook<Experiment, string> = ({ value, data }) => {
//   if (value) return value.trim()
//   if (!data?.description) return ''
//   const text = convertLexicalToPlaintext({ data: data?.description }).trim()
//   if (!text) return ''
//   return text.length > MAX_SUMMARY_LENGTH ? `${text.slice(0, MAX_SUMMARY_LENGTH - 3)}...` : text
// }

// const MAX_SUMMARY_LENGTH = 160

// const STATUS_OPTIONS = {
//   DRAFT: 'Draft',
//   PUBLISHED: 'Published',
// } as const

// const CACHE_TAG = 'experiments'

// export const Experiments: CollectionConfig = {
//   slug: 'experiments',
//   // trash: true,
//   // upload: {
//   //   mimeTypes: ['image/*'],
//   //   adminThumbnail: 'thumbnail',
//   // },
//   fields: [
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//       unique: true,
//     },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//       hooks: { beforeValidate: [generateSlugHook] },
//     },
//     {
//       name: 'laboratoryNumber',
//       type: 'number',
//       required: true,
//       min: 1,
//       max: 5,
//       defaultValue: 1,
//     },
//     {
//       name: 'description',
//       type: 'richText',
//       required: true,
//       // defaultValue: DefaultValue ,
//     },
//     {
//       name: 'contentSummary',
//       type: 'textarea',
//       required: true,
//       hooks: { beforeValidate: [generateDescriptionSummaryHook] },
//     },
//     {
//       name: 'coverImage',
//       type: 'upload',
//       relationTo: 'media',
//       // required: true,
//       filterOptions: {
//         mimeType: { contains: 'image' },
//       },
//     },
//     {
//       name: 'status',
//       type: 'select',
//       required: true,
//       options: Object.values(STATUS_OPTIONS),
//       defaultValue: STATUS_OPTIONS.DRAFT,
//     },
//     {
//       name: 'publishedAt',
//       type: 'date',
//       required: true,
//       admin: {
//         condition: (data) => data?.status === STATUS_OPTIONS.PUBLISHED,
//         date: { pickerAppearance: 'dayAndTime' },
//       },
//     },
//     {
//       name: 'laboratory',
//       type: 'relationship',
//       relationTo: 'laboratories',
//       required: true,
//       defaultValue: 1,
//     },
//   ],
//   hooks: {
//     afterChange: [() => revalidateTag(CACHE_TAG)],
//   },
// }
