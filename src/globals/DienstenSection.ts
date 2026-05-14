import type { GlobalConfig } from 'payload'

export const DienstenSection: GlobalConfig = {
  slug: 'diensten-section',
  label: 'Diensten & Informatie',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Diensten & Informatie',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Categories',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Category Title',
        },
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Open by Default',
          defaultValue: false,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Submenu Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
      ],
    },
  ],
}
