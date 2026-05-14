import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'displayName', 'customerNumber', 'createdAt'],
  },
  auth: true,
  fields: [
    {
      name: 'displayName',
      type: 'text',
      label: 'Display Name',
    },
    {
      name: 'firebaseUid',
      type: 'text',
      label: 'Firebase UID',
      unique: true,
      index: true,
    },
    {
      name: 'photoURL',
      type: 'text',
      label: 'Profile Photo URL',
    },
    {
      name: 'customerNumber',
      type: 'text',
      label: 'Klantnummer',
    },
    {
      name: 'balance',
      type: 'number',
      label: 'Saldo',
      defaultValue: 0,
    },
    {
      name: 'messageCount',
      type: 'number',
      label: 'Berichten',
      defaultValue: 0,
    },
    {
      name: 'profileType',
      type: 'select',
      label: 'Profiel Type',
      defaultValue: 'particulier',
      options: [
        { label: 'Particulier', value: 'particulier' },
        { label: 'Zakelijk', value: 'zakelijk' },
        { label: 'Partner', value: 'partner' },
      ],
    },
  ],
}

