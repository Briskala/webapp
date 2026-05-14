import type { GlobalConfig } from 'payload'

export const SidebarCards: GlobalConfig = {
  slug: 'sidebar-cards',
  label: 'Sidebar Cards',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (emoji or text)',
          admin: {
            description: 'E.g. 🧭 or 🚗',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'colorVariant',
          type: 'select',
          label: 'Color Variant',
          defaultValue: 'blue',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Orange', value: 'orange' },
          ],
        },
      ],
    },
    {
      name: 'manualDownloads',
      type: 'array',
      label: 'Manual Download Links (shown when no uploaded files exist)',
      admin: {
        description: 'Add download links here. When real files are uploaded via the Downloads collection (marked as public), those will be shown instead.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL / File Path',
        },
        {
          name: 'fileType',
          type: 'select',
          required: true,
          label: 'File Type',
          options: [
            { label: '.doc', value: 'doc' },
            { label: '.pdf', value: 'pdf' },
            { label: '.xls / .xlsx', value: 'excel' },
          ],
        },
      ],
    },
  ],
}
