import type { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  labels: {
    singular: 'Contact Aanvraag',
    plural: 'Contact Aanvragen',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Formulieren',
  },
  access: {
    read: () => true,
    create: () => true, // Ensure public can submit
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Naam',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mailadres',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Bericht',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Nieuw', value: 'new' },
        { label: 'In Behandeling', value: 'in_progress' },
        { label: 'Afgerond', value: 'closed' },
      ],
      defaultValue: 'new',
    },
  ],
}
