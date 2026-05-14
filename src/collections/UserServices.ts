import type { CollectionConfig } from 'payload'

export const UserServices: CollectionConfig = {
  slug: 'user-services',
  admin: {
    useAsTitle: 'id',
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
      name: 'service',
      type: 'relationship',
      relationTo: 'services', // Links to the existing services collection
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
