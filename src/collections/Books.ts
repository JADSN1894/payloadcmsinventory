import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    pagination: {
      defaultLimit: 50,
    },
  },
  fields: [
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
    }
  ],
}
