import type { CollectionConfig } from 'payload'
import { resolveCustomerUser, autoCreateServiceOnApproval } from '../lib/customerUtils'

export const Aanvragen: CollectionConfig = {
  slug: 'aanvragen',
  admin: {
    useAsTitle: 'title',
    group: 'Account',
    defaultColumns: ['title', 'customerNumber', 'status', 'requestDate'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [resolveCustomerUser],
    afterChange: [autoCreateServiceOnApproval],
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel van aanvraag',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'in_behandeling',
      options: [
        { label: 'In behandeling', value: 'in_behandeling' },
        { label: 'Goedgekeurd', value: 'goedgekeurd' },
        { label: 'Afgekeurd', value: 'afgekeurd' },
        { label: 'Meer informatie vereist', value: 'meer_info_vereist' },
        { label: 'On hold', value: 'on_hold' },
      ],
      label: 'Status',
    },
    {
      name: 'requestDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Datum Aanvraag',
    },
  ],
}
