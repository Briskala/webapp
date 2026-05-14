import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Company', value: 'company' },
        { label: 'Individual', value: 'individual' },
      ],
      defaultValue: 'individual',
    },
    {
      name: 'accountBalance',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
