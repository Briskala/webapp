import type { CollectionConfig } from 'payload'
import { companyField, roleField } from './shared'

export const AccountingMemberships: CollectionConfig = {
  slug: 'accounting-memberships',
  labels: { singular: 'Membership', plural: 'Memberships' },
  admin: {
    useAsTitle: 'id',
    group: 'Accounting',
    defaultColumns: ['company', 'user', 'role', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    roleField,
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Invited', value: 'invited' },
        { label: 'Revoked', value: 'revoked' },
      ],
    },
  ],
  timestamps: true,
}
