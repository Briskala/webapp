import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
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
