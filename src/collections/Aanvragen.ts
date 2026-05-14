import type { CollectionConfig } from 'payload'

export const Aanvragen: CollectionConfig = {
  slug: 'aanvragen',
  admin: {
    useAsTitle: 'title',
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
        { label: 'Afgerond', value: 'afgerond' },
        { label: 'Geannuleerd', value: 'geannuleerd' },
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
