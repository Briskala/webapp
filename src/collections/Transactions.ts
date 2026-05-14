import type { CollectionConfig } from 'payload'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  admin: {
    useAsTitle: 'description',
    group: 'Account',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Gebruiker',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Bedrag (€)',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Bijschrijving (Credit)', value: 'credit' },
        { label: 'Afschrijving (Debit)', value: 'debit' },
      ],
      label: 'Type Transactie',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Omschrijving',
    },
    {
      name: 'transactionDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Datum',
    },
  ],
}
