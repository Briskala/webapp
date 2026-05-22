import type { CollectionConfig } from 'payload'
import { resolveCustomerUser } from '../lib/customerUtils'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    group: 'Account',
    defaultColumns: ['title', 'customerNumber', 'status', 'uploadedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [resolveCustomerUser],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Document Titel',
    },
    {
      name: 'customerNumber',
      type: 'text',
      index: true,
      label: 'Klantnummer',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      index: true,
      label: 'Gebruiker',
    },
    {
      name: 'file',
      type: 'relationship',
      relationTo: 'media',
      label: 'Bestand',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'requested',
      options: [
        { label: 'Aangevraagd door admin', value: 'requested' },
        { label: 'In behandeling', value: 'in_behandeling' },
        { label: 'Goedgekeurd', value: 'goedgekeurd' },
        { label: 'Afgekeurd', value: 'afgekeurd' },
        { label: 'Verlopen', value: 'verlopen' },
      ],
      label: 'Status',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Interne notities (alleen admin)',
    },
    {
      name: 'feedback',
      type: 'text',
      label: 'Feedback voor klant (indien afgekeurd)',
    },
    {
      name: 'uploadedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Geüpload op',
    },
  ],
}
