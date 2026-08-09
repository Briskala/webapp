import type { CollectionConfig } from 'payload'
import { companyField } from './shared'

export const AccountingContacts: CollectionConfig = {
  slug: 'accounting-contacts',
  labels: { singular: 'Contact', plural: 'Contacts' },
  admin: {
    useAsTitle: 'name',
    group: 'Accounting',
    defaultColumns: ['name', 'type', 'email', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    { name: 'name', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Supplier', value: 'supplier' },
        { label: 'Both', value: 'both' },
      ],
    },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'vatNumber', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'notes', type: 'textarea' },
  ],
  timestamps: true,
}
