import type { CollectionConfig } from 'payload'
import { companyField, moneyField } from './shared'

export const AccountingExpenses: CollectionConfig = {
  slug: 'accounting-expenses',
  labels: { singular: 'Expense', plural: 'Expenses' },
  admin: {
    useAsTitle: 'description',
    group: 'Accounting',
    defaultColumns: ['description', 'status', 'total', 'expenseDate', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    { name: 'description', type: 'text', required: true },
    { name: 'expenseDate', type: 'date', required: true },
    { name: 'vendor', type: 'text' },
    { name: 'category', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    moneyField('subtotal', 'Subtotal'),
    { name: 'vatRate', type: 'number', defaultValue: 21 },
    moneyField('vatAmount', 'VAT'),
    moneyField('total', 'Total'),
    { name: 'receiptRef', type: 'text', label: 'Receipt reference' },
    { name: 'notes', type: 'textarea' },
    { name: 'posted', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
