import type { CollectionConfig } from 'payload'
import { ensureCustomerNumber } from '../lib/customerUtils'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['customerNumber', 'name', 'email', 'accountStatus'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeValidate: [ensureCustomerNumber],
  },
  fields: [
    {
      name: 'customerNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Klantnummer',
      admin: {
        description: 'Wordt automatisch gegenereerd indien leeg (formaat: BRISK-XXXXXX).',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Volledige Naam',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mailadres',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefoonnummer',
    },
    {
      name: 'accountStatus',
      type: 'select',
      defaultValue: 'actief',
      options: [
        { label: 'Actief', value: 'actief' },
        { label: 'Inactief', value: 'inactief' },
        { label: 'Geschorst', value: 'geschorst' },
      ],
      label: 'Account Status',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      index: true,
      label: 'Gekoppelde Gebruiker',
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Interne admin notities (snelle samenvatting)',
    },
    {
      name: 'customerDashboard',
      type: 'ui',
      label: 'Klantendashboard',
      admin: {
        components: {
          Field: '@/components/admin/CustomerDashboard#CustomerDashboard',
        },
      },
    },
  ],
}
