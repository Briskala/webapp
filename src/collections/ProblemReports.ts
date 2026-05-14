import type { CollectionConfig } from 'payload'

export const ProblemReports: CollectionConfig = {
  slug: 'problem-reports',
  labels: {
    singular: 'Probleem Melding',
    plural: 'Probleem Meldingen',
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
      name: 'problem',
      type: 'textarea',
      label: 'Beschrijving Probleem',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Nieuw', value: 'new' },
        { label: 'In Behandeling', value: 'in_progress' },
        { label: 'Opgelost', value: 'resolved' },
      ],
      defaultValue: 'new',
    },
  ],
}
