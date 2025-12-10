import type { CollectionConfig } from 'payload'
import { Experiment } from '@/payload-types'

import { FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { revalidateTag } from 'next/cache'

const generateSlugHook: FieldHook<Experiment, string> = ({ value, data }) => {
  if (value) return slugify(value.trim()) || ''
  return slugify(data?.title?.trim() || '') || ''
}

const CACHE_TAG_EXPERIMENTS = 'experiments';

export const Experiments: CollectionConfig = {
  slug: 'experiments',
  // upload: {
  //   mimeTypes: ['image/*'],
  //   adminThumbnail: 'thumbnail',
  // },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: { beforeValidate: [generateSlugHook] },
    },
    {
      name: 'laboratoryNumber',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 1,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Sem descrição',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      // required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
  hooks: {
    afterChange: [() => revalidateTag(CACHE_TAG_EXPERIMENTS)],
  },
}
