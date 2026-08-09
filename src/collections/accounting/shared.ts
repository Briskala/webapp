import type { Field } from 'payload'
import { ACCOUNTING_ROLES } from '@/lib/accounting/types'

export const companyField: Field = {
  name: 'company',
  type: 'relationship',
  relationTo: 'accounting-companies',
  required: true,
  index: true,
  admin: { position: 'sidebar' },
}

export const roleField: Field = {
  name: 'role',
  type: 'select',
  required: true,
  defaultValue: 'viewer',
  options: ACCOUNTING_ROLES.map((value) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  })),
}

export const moneyField = (name: string, label: string, required = false): Field => ({
  name,
  type: 'number',
  label,
  required,
  defaultValue: 0,
  admin: { step: 0.01 },
})

export const lineItemsField: Field = {
  name: 'lines',
  type: 'array',
  label: 'Regels',
  fields: [
    { name: 'description', type: 'text', required: true },
    { name: 'quantity', type: 'number', defaultValue: 1, required: true },
    { name: 'unitPrice', type: 'number', defaultValue: 0, required: true },
    { name: 'vatRate', type: 'number', defaultValue: 21, required: true },
    { name: 'lineTotal', type: 'number', defaultValue: 0 },
  ],
}
