import type { CollectionConfig } from 'payload'
import { companyField, moneyField } from './shared'

export const AccountingLedgerEntries: CollectionConfig = {
  slug: 'accounting-ledger-entries',
  labels: { singular: 'Ledger Entry', plural: 'Ledger Entries' },
  admin: {
    useAsTitle: 'description',
    group: 'Accounting',
    defaultColumns: ['entryDate', 'description', 'debitTotal', 'creditTotal', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    // Append-only GL: no updates/deletes from admin UI by default intent
    update: () => false,
    delete: () => false,
  },
  fields: [
    companyField,
    { name: 'entryDate', type: 'date', required: true, index: true },
    { name: 'description', type: 'text', required: true },
    { name: 'sourceType', type: 'text', required: true, index: true },
    { name: 'sourceId', type: 'text', required: true, index: true },
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
        { name: 'accountCode', type: 'text', required: true },
        moneyField('debit', 'Debit'),
        moneyField('credit', 'Credit'),
        { name: 'memo', type: 'text' },
      ],
    },
    moneyField('debitTotal', 'Debit Total'),
    moneyField('creditTotal', 'Credit Total'),
    {
      name: 'createdByUser',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
  timestamps: true,
}
