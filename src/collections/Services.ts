import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Emoji or icon identifier',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
