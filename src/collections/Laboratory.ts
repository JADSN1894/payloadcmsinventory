import { Laboratory } from '@/payload-types'
import { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { revalidateTag } from 'next/cache'

const generateSlugHook: FieldHook<Laboratory, string> = ({ value, data }) => {
  if (value) return slugify(value.trim()) || ''
  return slugify(data?.title?.trim() || '') || ''
}

// const CACHE_TAG = 'laboratories'

export const Laboratories: CollectionConfig = {
  slug: 'laboratories',
  defaultSort: 'id',
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
  ],
  // hooks: {
  //   afterChange: [() => revalidateTag(CACHE_TAG)],
  // },
} 
