import type { CollectionConfig } from 'payload'
import { companyField } from './shared'

export const AccountingAccounts: CollectionConfig = {
  slug: 'accounting-accounts',
  labels: { singular: 'Ledger Account', plural: 'Chart of Accounts' },
  admin: {
    useAsTitle: 'name',
    group: 'Accounting',
    defaultColumns: ['code', 'name', 'type', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    { name: 'code', type: 'text', required: true, index: true },
    { name: 'name', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Asset', value: 'asset' },
        { label: 'Liability', value: 'liability' },
        { label: 'Equity', value: 'equity' },
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'accounting-accounts',
    },
    { name: 'isSystem', type: 'checkbox', defaultValue: false },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
}
