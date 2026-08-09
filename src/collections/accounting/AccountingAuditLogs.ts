import type { CollectionConfig } from 'payload'
import { companyField } from './shared'

export const AccountingAuditLogs: CollectionConfig = {
  slug: 'accounting-audit-logs',
  labels: { singular: 'Audit Log', plural: 'Audit Logs' },
  admin: {
    useAsTitle: 'action',
    group: 'Accounting',
    defaultColumns: ['action', 'entityType', 'createdAt', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    companyField,
    { name: 'action', type: 'text', required: true },
    { name: 'entityType', type: 'text', required: true },
    { name: 'entityId', type: 'text' },
    { name: 'details', type: 'textarea' },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'ipAddress', type: 'text' },
  ],
  timestamps: true,
}
