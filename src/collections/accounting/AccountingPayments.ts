import type { CollectionConfig } from 'payload'
import { companyField, moneyField } from './shared'

export const AccountingPayments: CollectionConfig = {
  slug: 'accounting-payments',
  labels: { singular: 'Payment', plural: 'Payments' },
  admin: {
    useAsTitle: 'reference',
    group: 'Accounting',
    defaultColumns: ['reference', 'direction', 'amount', 'paymentDate', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    { name: 'reference', type: 'text' },
    { name: 'paymentDate', type: 'date', required: true },
    {
      name: 'direction',
      type: 'select',
      required: true,
      options: [
        { label: 'Incoming', value: 'incoming' },
        { label: 'Outgoing', value: 'outgoing' },
      ],
    },
    moneyField('amount', 'Amount', true),
    {
      name: 'method',
      type: 'select',
      defaultValue: 'bank',
      options: [
        { label: 'Bank', value: 'bank' },
        { label: 'Cash', value: 'cash' },
        { label: 'Card', value: 'card' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'completed',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Completed', value: 'completed' },
        { label: 'Void', value: 'void' },
      ],
    },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'accounting-invoices',
    },
    {
      name: 'bill',
      type: 'relationship',
      relationTo: 'accounting-bills',
    },
    { name: 'notes', type: 'textarea' },
    { name: 'posted', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
