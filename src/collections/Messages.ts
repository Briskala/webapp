import type { CollectionConfig } from 'payload'
import { resolveCustomerUser } from '../lib/customerUtils'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
    group: 'Account',
    defaultColumns: ['subject', 'customerNumber', 'messageType', 'sentDate', 'isRead'],
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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Gebruiker',
    },
    {
      name: 'customerNumber',
      type: 'text',
      index: true,
      label: 'Klantnummer',
      admin: {
        description: 'Wordt automatisch ingevuld op basis van de gebruiker.',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Onderwerp',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Bericht Inhoud',
    },
    {
      name: 'messageType',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normaal bericht', value: 'normal' },
        { label: 'Automatisch bericht', value: 'automatic' },
        { label: 'Documentverzoek', value: 'document_request' },
        { label: 'Waarschuwing', value: 'warning' },
        { label: 'Update', value: 'update' },
      ],
      label: 'Bericht Type',
    },
    {
      name: 'isRead',
      type: 'checkbox',
      defaultValue: false,
      label: 'Gelezen',
    },
    {
      name: 'sentDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Verzonden op',
    },
  ],
}
