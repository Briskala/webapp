import type { CollectionConfig } from 'payload'
import { companyField, moneyField } from './shared'

export const AccountingJournals: CollectionConfig = {
  slug: 'accounting-journals',
  labels: { singular: 'Journal Entry', plural: 'Journal Entries' },
  admin: {
    useAsTitle: 'reference',
    group: 'Accounting',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    { name: 'reference', type: 'text', required: true },
    { name: 'entryDate', type: 'date', required: true },
    { name: 'memo', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Posted', value: 'posted' },
        { label: 'Void', value: 'void' },
      ],
    },
    {
      name: 'lines',
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'account',
          type: 'relationship',
          relationTo: 'accounting-accounts',
          required: true,
        },
        { name: 'accountCode', type: 'text' },
        moneyField('debit', 'Debit'),
        moneyField('credit', 'Credit'),
        { name: 'memo', type: 'text' },
      ],
    },
    moneyField('debitTotal', 'Debit Total'),
    moneyField('creditTotal', 'Credit Total'),
    { name: 'posted', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
