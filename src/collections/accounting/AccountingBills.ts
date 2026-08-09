import type { CollectionConfig } from 'payload'
import { companyField, lineItemsField, moneyField } from './shared'

export const AccountingBills: CollectionConfig = {
  slug: 'accounting-bills',
  labels: { singular: 'Bill', plural: 'Bills' },
  admin: {
    useAsTitle: 'number',
    group: 'Accounting',
    defaultColumns: ['number', 'status', 'total', 'issueDate', 'company'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    companyField,
    { name: 'number', type: 'text', required: true, index: true },
    {
      name: 'contact',
      type: 'relationship',
      relationTo: 'accounting-contacts',
    },
    { name: 'supplierName', type: 'text' },
    { name: 'issueDate', type: 'date', required: true },
    { name: 'dueDate', type: 'date' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Received', value: 'received' },
        { label: 'Partial', value: 'partial' },
        { label: 'Paid', value: 'paid' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Void', value: 'void' },
      ],
    },
    lineItemsField,
    moneyField('subtotal', 'Subtotal'),
    moneyField('vatAmount', 'VAT'),
    moneyField('total', 'Total'),
    moneyField('amountPaid', 'Amount Paid'),
    moneyField('balanceDue', 'Balance Due'),
    { name: 'notes', type: 'textarea' },
    { name: 'posted', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
