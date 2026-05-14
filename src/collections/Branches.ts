import type { CollectionConfig } from 'payload'

export const Branches: CollectionConfig = {
  slug: 'branches',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'country', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Branch Name',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'City',
    },
    {
      name: 'country',
      type: 'select',
      required: true,
      label: 'Country',
      options: [
        { label: 'België', value: 'BE' },
        { label: 'France', value: 'FR' },
        { label: 'Nederland', value: 'NL' },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
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
