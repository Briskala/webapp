import type { CollectionConfig } from 'payload'
import { resolveCustomerUser } from '../lib/customerUtils'

export const UserServices: CollectionConfig = {
  slug: 'user-services',
  admin: {
    useAsTitle: 'id',
    group: 'Account',
    defaultColumns: ['user', 'customerNumber', 'service', 'status', 'startDate'],
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
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      label: 'Dienst',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'actief',
      options: [
        { label: 'Actief', value: 'actief' },
        { label: 'Inactief', value: 'inactief' },
        { label: 'Verlopen', value: 'verlopen' },
      ],
      label: 'Status',
    },
    {
      name: 'startDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Startdatum',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Einddatum (optioneel)',
    },
  ],
}
