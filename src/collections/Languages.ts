import type { CollectionConfig } from 'payload'

export const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'status', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Language Name',
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      label: 'Language Code (e.g. NL, FR, EN)',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (emoji)',
      defaultValue: '🌐',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Language URL (e.g. /nl, /fr, /en)',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
    },
  ],
}
