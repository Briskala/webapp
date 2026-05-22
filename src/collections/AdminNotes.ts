import type { CollectionConfig } from 'payload'
import { resolveCustomerUser } from '../lib/customerUtils'

export const AdminNotes: CollectionConfig = {
  slug: 'admin-notes',
  admin: {
    useAsTitle: 'id',
    group: 'Account',
    defaultColumns: ['customerNumber', 'note', 'createdAt'],
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
      name: 'customerNumber',
      type: 'text',
      index: true,
      required: true,
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
      name: 'note',
      type: 'textarea',
      required: true,
      label: 'Notitie',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Auteur',
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Gemaakt op',
    },
  ],
}
