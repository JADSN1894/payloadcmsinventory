import type { CollectionConfig } from 'payload'

export const Experiments: CollectionConfig = {
  slug: 'experiments',
  defaultSort: 'id',
  admin: {
    pagination: {
      defaultLimit: 50,
    },
  },
  upload: {
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'laboratory',
      type: 'relationship',
      relationTo: 'laboratories',
      required: true,
      defaultValue: 1,
    },
    {
      name: 'qtde',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 1,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
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
}
