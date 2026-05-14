import type { CollectionConfig } from 'payload'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'make',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'make',
      type: 'text',
      required: true,
    },
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
