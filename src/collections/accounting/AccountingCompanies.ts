import type { CollectionConfig } from 'payload'
import { generatePublicHash, slugifyCompanyName } from '@/lib/accounting/hash'

export const AccountingCompanies: CollectionConfig = {
  slug: 'accounting-companies',
  labels: { singular: 'Accounting Company', plural: 'Accounting Companies' },
  admin: {
    useAsTitle: 'name',
    group: 'Accounting',
    defaultColumns: ['name', 'slug', 'currency', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL segment, e.g. acme-bv' },
    },
    {
      name: 'publicHash',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Public environment id used in /accounting/{slug}/{hash}',
        readOnly: true,
      },
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'EUR',
      required: true,
      options: [
        { label: 'EUR', value: 'EUR' },
        { label: 'USD', value: 'USD' },
        { label: 'GBP', value: 'GBP' },
      ],
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'NL',
      required: true,
    },
    { name: 'vatNumber', type: 'text', label: 'BTW-nummer' },
    { name: 'chamberOfCommerce', type: 'text', label: 'KvK-nummer' },
    { name: 'address', type: 'textarea' },
    {
      name: 'fiscalYearStart',
      type: 'text',
      defaultValue: '01-01',
      admin: { description: 'MM-DD' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        if (!data) return data
        if (operation === 'create' || !data.slug) {
          if (data.name && !data.slug) data.slug = slugifyCompanyName(data.name)
        }
        if (operation === 'create' && !data.publicHash) {
          data.publicHash = generatePublicHash(8)
        }
        return data
      },
    ],
  },
  timestamps: true,
}
