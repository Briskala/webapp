import type { CollectionConfig } from 'payload'
import { companyField } from './shared'

export const AccountingTaxRates: CollectionConfig = {
  slug: 'accounting-tax-rates',
  labels: { singular: 'Tax Rate', plural: 'Tax Rates' },
  admin: {
    useAsTitle: 'name',
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
    { name: 'name', type: 'text', required: true },
    { name: 'rate', type: 'number', required: true, defaultValue: 21 },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'vat',
      options: [
        { label: 'VAT / BTW', value: 'vat' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'isDefault', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
