import type { CollectionConfig } from 'payload'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
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
      label: 'Title',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'File',
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
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Public (show on website)',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
