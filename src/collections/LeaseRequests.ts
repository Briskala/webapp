import type { CollectionConfig } from 'payload'

export const LeaseRequests: CollectionConfig = {
  slug: 'lease-requests',
  labels: {
    singular: 'Vrijblijvende Aanvraag',
    plural: 'Vrijblijvende Aanvragen',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Formulieren',
    defaultColumns: ['name', 'email', 'vehicleName', 'monthlyPayment', 'termMonths', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Naam Klant',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mailadres',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefoonnummer',
      required: true,
    },
    {
      name: 'vehicleName',
      type: 'text',
      label: 'Voertuig & Uitvoering',
      required: true,
    },
    {
      name: 'downPayment',
      type: 'number',
      label: 'Aanbetaling (€)',
      required: true,
    },
    {
      name: 'termMonths',
      type: 'number',
      label: 'Looptijd (maanden)',
      required: true,
    },
    {
      name: 'residualValue',
      type: 'number',
      label: 'Slottermijn (€)',
      required: true,
    },
    {
      name: 'interestRate',
      type: 'number',
      label: 'Rentevoet (%)',
      required: true,
      defaultValue: 4.9,
    },
    {
      name: 'monthlyPayment',
      type: 'number',
      label: 'Maandbedrag (€)',
      required: true,
    },
    {
      name: 'totalPayment',
      type: 'number',
      label: 'Totale Betaling (€)',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Aanvraag',
      defaultValue: 'nieuw',
      options: [
        { label: 'Nieuw', value: 'nieuw' },
        { label: 'In Behandeling', value: 'in_behandeling' },
        { label: 'Goedgekeurd', value: 'goedgekeurd' },
        { label: 'Geweigerd', value: 'geweigerd' },
        { label: 'Afgerond', value: 'afgerond' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Opmerkingen / Notities',
    },
  ],
}
