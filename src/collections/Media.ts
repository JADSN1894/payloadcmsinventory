import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  defaultSort: 'id',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  // upload: {
  //   staticDir: '/media',
  //   mimeTypes: ['image/*'],
  // },
  upload: true,
}
